import { XMLReader, Locator, DOMBuilder, ElementAttributes } from "xmldom/sax";
import { RootSchema, PropertySchema, ArraySchema, ValueSchema, BaseSchema } from "./decorators";

interface ElementContext {
	schema: BaseSchema | null;
	value: any;
}

class DeserializerBuilder implements DOMBuilder {
	private xmlRootSchemas: RootSchema[];
	private elementStack: ElementContext[] = [];
	public locator: Locator = null as any as Locator;
	public currentElement: any = null;
	public result: any = null;

	constructor(xmlRootSchemas: RootSchema[]) {
		this.xmlRootSchemas = xmlRootSchemas;
	}

	startDocument(): void {
	}

	endDocument(): void {
	}

	characters(xt: string, start: number, length: number): void {
		const parent = this.elementStack[this.elementStack.length - 1];
		if (!parent.schema) {
			return;
		}

		// console.log("chars", xt, start, length)

		const schema = parent.schema;
		if (schema.xmlType === "root" || schema.xmlType === "element") {
			if (schema.type === Number || schema.type === Boolean || schema.type === String || schema.type === Date) {
				parent.value = this.convertValue(xt, parent.schema.type);
			}
		}
	}

	startElement(ns: string, localName: string, tagName: string, el: ElementAttributes): void {
		if (this.elementStack.length === 0) {
			this.startRoot(ns, localName, tagName, el)
			return ;
		}

		const parent = this.elementStack[this.elementStack.length - 1];

		if (!parent.schema) {
			this.elementStack.push({
				value: null,
				schema: null,
			});
			return;
		}

		if (parent.schema.xmlType === "element" || parent.schema.xmlType === "root") {
			const children: PropertySchema[] = Reflect.getMetadata("xml:type:children", parent.schema.type) || [];
			const childSchema = children.find(c => (c.xmlType === "element" || c.xmlType === "array") && c.name === localName && c.namespaceUri === (ns ? ns : ''));
			if (!childSchema) {
				// TODO: fail if complex content in a simple type
				// console.log("Skipping element " + ns + "/" + localName + "/" + tagName + " (no schema)", el, parent.schema);
				this.elementStack.push({
					value: null,
					schema: null,
				})
				return;
			}

			if (childSchema.xmlType === "array" && !(childSchema as ArraySchema).nested) {

				const arraySchema = childSchema as ArraySchema;

				// Push a fake array container for this item, reusing the array value
				const value = parent.value[childSchema.propertyKey] = parent.value[childSchema.propertyKey] || [];
				
				this.elementStack.push({
					value: value,
					schema: childSchema,
				});

				const itemSchema: ValueSchema = {
					name: arraySchema.itemName,
					namespaceUri: arraySchema.namespaceUri,
					xmlType: "element",
					enum: null,
					type: arraySchema.itemType,
				};
				this.pushValue(itemSchema, el);
	
			} else {
				this.pushValue(childSchema, el);
			}

		} else if (parent.schema.xmlType === "array") {

			const arraySchema = parent.schema as ArraySchema;

			if (localName !== arraySchema.itemName || (ns ? ns : '') !== arraySchema.namespaceUri) {
				// Ignore if element is not an item type
				this.elementStack.push({
					value: null,
					schema: null,
				})
				return;
			}

			const itemSchema: ValueSchema = {
				name: arraySchema.itemName,
				namespaceUri: arraySchema.namespaceUri,
				xmlType: "element",
				enum: null,
				type: arraySchema.itemType,
			};
			this.pushValue(itemSchema, el);
		} else {
			throw new Error("Internal error. Found element in " + parent.schema.xmlType);
		}
	}

	endElement(ns: string, localName: string, tagName: string): void {

		const parent = this.elementStack.pop();
		if (!parent) {
			throw new Error("Unbalanced xml");
		}

		if (!parent.schema) {
			return;
		}

		if (this.elementStack.length === 0) {
			this.result = parent.value;
			return;
		}

		var top = this.elementStack[this.elementStack.length - 1];
		if (top.schema === null) {
			return;
		}

		if (top.schema.xmlType === "element" || top.schema.xmlType === 'root') {
			const propertySchema = parent.schema as PropertySchema;
			top.value[propertySchema.propertyKey] = parent.value;
		} else if (top.schema.xmlType === "array") {
			top.value.push(parent.value);

			// Pop one more time for non-nested arrays to account for the fake array container
			const arraySchema = top.schema as ArraySchema;
			if (!arraySchema.nested) {
				this.elementStack.pop();
			}
		} else {
			throw new Error("?? " + top.schema.xmlType);
		}
	}

	startPrefixMapping(nsPrefix: string, value: string): void {
		// console.log(nsPrefix, value)
	}

	endPrefixMapping(prefix: string): void {
	}

	comment(source: string, start: number, length: number): void {
	}

	startCDATA(): void {
	}

	endCDATA(): void {
	}

	startDTD(name: string, pubid: string, sysid: string): void {
	}

	endDTD(): void {
	}

	processingInstruction(p1: string, p2: string): void {
	}

	private startRoot(ns: string, localName: string, tagName: string, el: ElementAttributes): void {
		// TODO: scan multiple roots
		const rootSchema = this.xmlRootSchemas[0];

		if (localName !== rootSchema.name) {
			throw new Error("Expected root element '" + rootSchema.name + "' but got '" + localName + "'");
		}

		const value: any = {};
		this.elementStack.push({
			value: value,
			schema: rootSchema,
		});

		this.setAttributes(value, rootSchema, el);
	}

	private setAttributes(value: any, schema: BaseSchema, el: ElementAttributes) {
		for (let i = 0; i < el.length; i++) {
			const qName = el.getQName(i);
			if (qName === "xmlns" || qName.startsWith("xmlns:")) {
				continue;
			}

			const localName = el.getLocalName(i);
			const namespaceUri = el.getURI(i); // TODO: enforce namespace, default namespace

			const children: PropertySchema[] = Reflect.getMetadata("xml:type:children", schema.type) || [];
			const childSchema = children.find((c: any) => c.xmlType === 'attribute' && c.name === localName);
			if (!childSchema) {
				// console.log("Skipping attribute " + localName + " (no schema)");
				continue;
			}

			value[childSchema.propertyKey] = this.convertValue(el.getValue(i), childSchema.type);
		}
	}

	private pushValue(schema: ValueSchema, el: ElementAttributes) {

		if (schema.type === Number || schema.type === Boolean || schema.type === String || schema.type === Date) {
			this.elementStack.push({
				value: undefined,
				schema: schema,
			});
		} else if (schema.type === Array) {
			const arraySchema = schema as ArraySchema;
			if (!arraySchema.nested) {
				throw new Error("Internal error. Cannot push non-nested array here");
			}

			const value: any = [];
			this.elementStack.push({
				value: value,
				schema: schema,
			});
		} else if (typeof schema.type === "function") {
			// Complex object
			const value: any = {}; // new schema.type; // TODO: construct
			this.setAttributes(value, schema, el);

			this.elementStack.push({
				value: value,
				schema: schema,
			});
		} else if (Array.isArray(schema.type)) {
			throw new Error("Internal error: Shouldnt be array here");
		} else {
			throw new Error("Invalid schema type " + schema.type);
		}
	}

	private convertValue(value: string, type: any) {
		if (type === String) {
			return value;
		} else if (type === Number) {
			var numberResult = parseInt(value);
			if (isNaN(numberResult)) {
				throw new Error("Cannot convert to number: " + value);
			}
			return numberResult;
		} else if (type === Date) {
			var dateResult = new Date(value);
			if (isNaN(dateResult.valueOf())) {
				throw new Error("Cannot convert to date: " + value);
			}
			return dateResult;
		} else if (type === Boolean) {
			if (value === "true") {
				return true;
			}
			if (value === "false") {
				return false;
			}

			throw new Error("Cannot convert value to boolean: " + value);
		} else {
			throw new Error("Unsupported conversion: " + type);
		}
	}
}

export class XMLDecoratorDeserializer {
	
	deserialize(source: string, type: Function): any {

		// TODO: array of types; instead of array of roots on one type
		const xmlRootSchemas: RootSchema[] = Reflect.getMetadata("xml:root", type);
		if (!xmlRootSchemas) {
			throw new Error("Root type must specify @xmlRoot decorator");
		}

		var reader = new XMLReader();
		var builder = new DeserializerBuilder(xmlRootSchemas);
		reader.domBuilder = builder;
		reader.errorHandler = {
			warning(msg: any) {
				console.warn("Warning: " + msg);
			},
			error(msg: any) {
				console.error("Error: " + msg);
			},
			fatalError(msg: any) {
				console.error("Fatal: " + msg);
			},
		};

		var defaultNSMap = { xml: 'http://www.w3.org/XML/1998/namespace'};
		var entityMap = {'lt': '<', 'gt': '>', 'amp': '&', 'quot': '"', 'apos':"'"}

		reader.parse(source, defaultNSMap, entityMap);
		return builder.result;
	}
}

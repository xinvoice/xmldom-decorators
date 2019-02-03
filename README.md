# xmldom-decorators - TypeScript decorators and (de-)serializer for xmldom

## Example

Given a TypeScript class defining the XML schema:

```typescript
@XMLRoot()
export class MyXmlType {
	@XMLAttribute()
	a: number = 0;

	@XMLElement()
	b: string = "";

	@XMLArray({itemName: "v", itemType: Number})
	n: number[] = [];
}
```

### Serialize JavaScript objects to XML

```typescript
const data: MyXmlType = {
	a: 1,
	b: "c",
	n: [1,2,3]
};

const serializer = new XMLDecoratorSerializer();
const xml = serializer.serialize(data, MyXmlType);
```

### Deserialize XML to JavaScript objects:

```typescript
var xml = `<MyXml a="1">
	<b>c</b>
	<n>
		<v>1</v>
		<v>2</v>
		<v>3</v>
	</n>
</MyXml>`;

const deserializer = new XMLDecoratorDeserializer();
const data = deserializer.deserialize(xml, MyXmlType);
```


## Classes

### XMLDecoratorDeserializer

#### `deserialize(data: string, type: Function): any`

Deserializes an XML string into a JavaScript object. The type parameter must be a class with the `@XMLRoot` decorator.

### XMLDecoratorSerializer

#### `serialize(data: any, type: Function): string`

Serializes a JavaScript object into an XML string. The type parameter must be a class with the `@XMLRoot` decorator.

## Decorators

#### `@XMLRoot({name?, namespaceUri?})`

Applied to classes which define a root XML document element.

#### `@XMLElement({name?, namespaceUri?})`

Applied to class members which define an XML element. Must have a value type or class type. Throws a runtime error if applied to an array type.

#### `@XMLAttribute({name?, namespaceUri?})`

Applied to class members which define an attribute on an XML element. Must have value type. Throws a runtime error if applied to a class or an array type.

#### `@XMLArray({name?, namespaceUri?, itemName?, itemType, nested?})`

Applied to class members which define an array of XML elements, with or without a container XML element. Throws a runtime error if applied to a type which is not an array type.

- `name: string` - The name of the array element(s). Default: the name of the property the decorator was applied to
- `itemName: string` - The name of array item elements inside the container element, if there is one. Default: the name of the item type
- `itemType: any` - The type of array items. Required
- `nested: boolean` - Specifies if there is a container element for the array items. Default: true
	
## TODO

- @XMLText({name?})
- Allow to specify xs:integer, decimal, float on number types
- Replace the XML parser
- Base classes / inheritance
- xsd<->ts codegen tool
- More control over dates
- Recommendations for defaults
- Enums
- Strict options

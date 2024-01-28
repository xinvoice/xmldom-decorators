import { SchemaMapper } from "../src/schemascanner"
import { formatClasses } from "../src/classformatter"

describe("attribute-use-optional", () => {
    it("should generate correct code for use=optional attribute", () => {
        const mapper = new SchemaMapper();
        mapper.load("test/data/optional-attribute.xsd");
        
        const classes = mapper.getClasses();
        const output = formatClasses(classes);

        expect(output).toMatchSnapshot(`
        import { XMLRoot, XMLElement, XMLArray, XMLAttribute, XMLText } from "@xinvoice/xmldom-decorators";                                      
                                                                                                                                               
      @XMLRoot({name: "exampleElement", namespaceUri: ""})                                                                                     
      export class exampleElement {                                                                                                            
          @XMLAttribute()
          optionalAttribute?: string = undefined;
      }`)
    });
});
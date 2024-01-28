import { SchemaMapper } from "../src/schemascanner"
import { formatClasses } from "../src/classformatter"

describe("element-default", () => {
    it("required type 'boolean' should have correct default value", () => { 
        const mapper = new SchemaMapper();
        mapper.load("test/data/boolean-element.xsd");
        
        const classes = mapper.getClasses();
        const output = formatClasses(classes);

        expect(output).toContain("indicator: boolean = false;")
    });

    it("optional type 'boolean' should have correct default value", () => { 
        const mapper = new SchemaMapper();
        mapper.load("test/data/boolean-element-optional.xsd");
        
        const classes = mapper.getClasses();
        const output = formatClasses(classes);

        expect(output).toContain("indicator?: boolean;")
    });
});
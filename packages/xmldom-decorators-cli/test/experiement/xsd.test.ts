import * as fs from "fs";
import startExperimentCli from "../../src/experiment";

describe("EXPERIMENT: xsd command", () => {

    beforeAll(() => {
        process.env.EXPERIMENT = "true";
       
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should generate correct code for xsd file and write to console", () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation();
        process.argv = ["node", "cli", "xsd", "./test/data/cross-industry-invoice/FACTUR-X_EN16931.xsd"];
        startExperimentCli()
        expect(logSpy).toMatchSnapshot()
    });

    it("should generate correct code for xsd file and write to output directory", () => {
        process.argv = ["node", "cli", "xsd", "./test/data/cross-industry-invoice/FACTUR-X_EN16931.xsd", "--output-dir", "./test-output"];
        startExperimentCli()
        
        const generatedFile: Record<string, string> = {};
        const files = fs.readdirSync("./test-output");
        
        for (const file of files) {
            generatedFile[file] = fs.readFileSync(`./test-output/${file}`).toString();
        }

        expect(files.length).toBe(63);
        for (const [fileName, content] of Object.entries(generatedFile)) {
            expect(content).toMatchSnapshot(fileName);
        }
    });
});
import { SchemaMapper } from "../../schemascanner";
import { formatClasses, _experiment_formatClasses } from '../../classformatter';
import * as fs from "fs";

export function runXsdCommand(xsdPath: string, options: { outputDir?: string }) {

    //backwards compatible output to console
    if (options.outputDir === undefined) {
        const mapper = new SchemaMapper();
        mapper.load(xsdPath);

        const classes = mapper.getClasses();
        console.log(formatClasses(classes));
        return;
    }

    console.log('[EXPERIMENT] You use the flag --output-dir to specify the output directory');

    if (options.outputDir === undefined) {
        console.error("No output directory specified");
        process.exit(1);
    }

    // Check if the output directory exists or create it^
    if (options.outputDir !== undefined) {
        if (!fs.existsSync(options.outputDir)) {
            fs.mkdirSync(options.outputDir);
        }
    }

    const mapper = new SchemaMapper();
    mapper.load(xsdPath);

    const classes = mapper.getClasses();
    const output = _experiment_formatClasses(classes);

    console.log(`Writing ${Object.keys(output).length} files to ${options.outputDir}`);

    for (let [fileName, content] of Object.entries(output)) {
        fs.writeFileSync(`${options.outputDir}/${fileName}.ts`, content);
    }
    console.log("Successful generation of TypeScript classes from XSD and saved to output directory");
}

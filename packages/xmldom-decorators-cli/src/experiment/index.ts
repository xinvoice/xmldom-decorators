// Experiment CLI
import { Command } from 'commander';
const program = new Command();

import { version } from '../../package.json';
import { runXsdCommand } from './commands/xsd.command';

async function startExperimentCli() {
    program
        .name('xmldom-decorators-cli')
        .description('Command line tool to generate TypeScript classes from XML Schema/XSD. The TypeScript classes can be serialized and deserialized using the xmldom-decorators library.')
        .version(version)

    program.command('xsd')
        .description('Generate TypeScript classes from XML Schema/XSD')
        .argument('<xsd input file>', 'path to the XSD file')
        .option('-o, --output-dir <string>', 'output directory')
        .action((xsdPath: string, options: { outputDir?: string }) => {
            runXsdCommand(xsdPath, options);
        });

    program.parseAsync();

}

export default startExperimentCli;

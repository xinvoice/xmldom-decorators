#!/usr/bin/env node
import { SchemaMapper } from './schemascanner'
import { formatClasses } from './classformatter';
import startExperimentCli from './experiment';

// Register the experiment CLI in ./experiment/index.ts
const isExperimentUssageAllowed = process.env.EXPERIMENT === "true"

if (isExperimentUssageAllowed){
    console.warn('\x1b[33m',"WARNING: You are using the experimental cli interface.\n" +
    " Some features are not yet stable and may not work as expected.\n" 
    + "\x1b[0m");
    startExperimentCli();
    process.exit(1);
}


if (process.argv.length < 3) {
    console.log("Usage: xsd filename.xsd");
    process.exit(1);
}

const mapper = new SchemaMapper();
mapper.load(process.argv[2]);

const classes = mapper.getClasses();
console.log(formatClasses(classes));

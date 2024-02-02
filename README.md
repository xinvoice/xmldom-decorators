# xmldom-decorators

TypeScript decorators and (de-)serializer for xmldom.

See [packages/xmldom-decorators](packages/xmldom-decorators)

# xmldom-decorators-cli

XSD to TypeScript classes with decorators.

See [packages/xmldom-decorators-cli](packages/xmldom-decorators-cli)

# Notes to self

First check out the source code and bootstrap the monorepo build environment:

```bash
git clone https://github.com/xinvoice/xmldom-decorators.git
cd xmldom-decorators
npm install
```

Build, run tests and execute a REST API sample:

```bash
npm run build
npm run test
node ./packages/sample-clients location
```
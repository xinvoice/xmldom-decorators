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
npm install   # installs blerf in the root project
```

Build, run tests and execute a REST API sample:

```bash
npm run build # shortcut for ./node_modules/.bin/blerf build
npm run test  # shortcut for ./node_modules/.bin/blerf test
node ./packages/sample-clients location
```

## Publishing a version

To publish a new version, simply create a new tag and push it:

```

npm version <minor|patch|major> --ws --include-workspace-root
git push --follow-tags
```

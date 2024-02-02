# @xinvoice/xmldom-decorators
Welcome to **xmldom-decorators**, an enhanced fork of the `andersnm/xmldom-decorators` library. At XInvoice, we have taken the robust foundation of the original lib and have infused it with additional functionality and improvements, tailored to meet the evolving needs of our product.

# About This Fork
Our journey with `xmldom-decorators` began as a necessity to adapt and evolve the existing library for our specific use cases. We focused on enhancing its capabilities, optimizing performance, and ensuring greater reliability. As we progressed, we realized that our enhancements could benefit the wider developer community. Therefore, we are delighted to share our version of the library with you.

# Key Improvements

**Enhanced Functionality**:
- the new experiment CLI interface
    - `--output-dir` generate decorator classes in specific folder
- extend the xsd specification implementation:
    - support for `use=optional` attribute
- fix issues in codebase
    - missing initializer for required booleans

**Regular Maintenance**: 
    Our team actively maintains the codebase, ensuring it stays up-to-date with the latest industry standards and security practices.


# Getting Started

This repo contains a lib to serilize/deserilaize and a CLI to generate decorator classes from your xsd specification.

## Using xmldom-decorators-cli

Download the CLI to generate XML decorators classes:

```sh
npm install @xinvoice/xmldom-decorators-cli

xmldom-decorators-cli ./input-test.xsd > test-output.ts
```

✨ or you can use our `experiment` CLI interface to export the generated classes to your codebase using:

```sh 
EXPERIMENT=true xmldom-decorators-cli xsd ./input-test.xsd -o ./src/schema
```

## Using xmldom-decorators

Download the serialize and deserialize lib using the following command:

```sh
npm install @xinvoice/xmldom-decorators
```

Enable emitting decorator metadata in tsconfig.json:

```ts
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Example

#### Serialize JavaScript objects to XML

```typescript
const data: MyXmlType = {
  a: 1,
  b: "c",
  n: [1, 2, 3],
};

const serializer = new XMLDecoratorSerializer();
const xml = serializer.serialize(data, MyXmlType);
```

#### Deserialize XML to JavaScript objects:

```typescript
var xml = `<MyXmlType a="1">
	<b>c</b>
	<n>
		<v>1</v>
		<v>2</v>
		<v>3</v>
	</n>
</MyXmlType>`;

const deserializer = new XMLDecoratorDeserializer();
const data = deserializer.deserialize(xml, MyXmlType);
```

> More information you can find in the [README.md](./packages/xmldom-decorators/) of the package

---

### Contributing
We welcome contributions from the community. Whether it's a feature request, bug report, or a pull request, your input is valuable to us. Please refer to our contributing guidelines for more information on how to get involved.

Thank you for your interest in xmldom-decorators. We're excited to see how you use it to build amazing things!


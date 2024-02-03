import { XMLRoot, XMLElement, XMLArray, XMLAttribute, XMLText } from "@xinvoice/xmldom-decorators";


@XMLRoot({name: "IDType", namespaceUri: "urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100"})
export class IDType {
    @XMLText()
    value: string = "";

    @XMLAttribute({namespaceUri: "urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100"})
    schemeID?: string = undefined;

}


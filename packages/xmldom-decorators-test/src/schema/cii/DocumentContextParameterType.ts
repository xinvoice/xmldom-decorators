import { XMLRoot, XMLElement, XMLArray, XMLAttribute, XMLText } from "@xinvoice/xmldom-decorators";

import { IDType } from "./IDType";

@XMLRoot({name: "DocumentContextParameterType", namespaceUri: "urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"})
export class DocumentContextParameterType {
    @XMLElement({types: [{ name: "ID", namespaceUri: "urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" }]})
    iD?: IDType;

}


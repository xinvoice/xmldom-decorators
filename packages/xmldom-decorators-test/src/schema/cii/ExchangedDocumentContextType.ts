import { XMLRoot, XMLElement, XMLArray, XMLAttribute, XMLText } from "@xinvoice/xmldom-decorators";

import { DocumentContextParameterType } from "./DocumentContextParameterType";

@XMLRoot({name: "ExchangedDocumentContextType", namespaceUri: "urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"})
export class ExchangedDocumentContextType {
    @XMLElement({types: [{ name: "GuidelineSpecifiedDocumentContextParameter", namespaceUri: "urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" }]})
    guidelineSpecifiedDocumentContextParameter: DocumentContextParameterType = new DocumentContextParameterType();

    @XMLElement({types: [{ name: "GuidelineSpecifiedDocumentContextParameter2", namespaceUri: "urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" }]})
    guidelineSpecifiedDocumentContextParameter2: DocumentContextParameterType = new DocumentContextParameterType();

}


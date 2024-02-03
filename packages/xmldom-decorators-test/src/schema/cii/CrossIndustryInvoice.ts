import { XMLRoot, XMLElement, XMLArray, XMLAttribute, XMLText } from "@xinvoice/xmldom-decorators";

import { ExchangedDocumentContextType } from "./ExchangedDocumentContextType";

@XMLRoot({name: "CrossIndustryInvoice", namespaceUri: "urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"})
export class CrossIndustryInvoice {
    @XMLElement({types: [{ name: "ExchangedDocumentContext", namespaceUri: "urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100" }]})
    exchangedDocumentContext: ExchangedDocumentContextType = new ExchangedDocumentContextType();

}


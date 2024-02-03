import { XMLDecoratorSerializer } from "@xinvoice/xmldom-decorators";
import { CrossIndustryInvoice } from "../schema/cii/CrossIndustryInvoice";

describe('serialize-all-ns-in-root', () => {
    /**
     * Test case: We have an XSD with three imports for three different namespaces. 
     * We want to serialize the object to XML and have all three namespaces in the root element.
     */
    it('should serialize all ns in root when feature is enabled', () => {
        const data: CrossIndustryInvoice = {
            exchangedDocumentContext: {
                guidelineSpecifiedDocumentContextParameter: {
                    iD: {
                        value:
                            'placeholder-id-for-testing',
                    },
                },
                guidelineSpecifiedDocumentContextParameter2: {
                    iD: {
                        value:
                            'placeholder-id-for-testing-2',
                    },
                },

            },
        };

        const serializer = new XMLDecoratorSerializer();
        serializer.setExperimentFlag('SERIALIZE_ALL_NAMESPACES_IN_ROOT', true);
        const xml = serializer.serialize(
            data,
            CrossIndustryInvoice
        );
        expect(xml).toMatchInlineSnapshot(`"<p0:CrossIndustryInvoice xmlns:p1="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" xmlns:p0="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"><p0:ExchangedDocumentContext><p1:GuidelineSpecifiedDocumentContextParameter><p1:ID>placeholder-id-for-testing</p1:ID></p1:GuidelineSpecifiedDocumentContextParameter><p1:GuidelineSpecifiedDocumentContextParameter2><p1:ID>placeholder-id-for-testing-2</p1:ID></p1:GuidelineSpecifiedDocumentContextParameter2></p0:ExchangedDocumentContext></p0:CrossIndustryInvoice>"`);
    });

    it("should not serialize all ns in root when feature is disabled", () => {
        const data: CrossIndustryInvoice = {
            exchangedDocumentContext: {
                guidelineSpecifiedDocumentContextParameter: {
                    iD: {
                        value:
                            'placeholder-id-for-testing',
                    },
                },
                guidelineSpecifiedDocumentContextParameter2: {
                    iD: {
                        value:
                            'placeholder-id-for-testing-2',
                    },
                },

            },
        };

        const serializer = new XMLDecoratorSerializer();
        serializer.setExperimentFlag('SERIALIZE_ALL_NAMESPACES_IN_ROOT', false);
        const xml = serializer.serialize(
            data,
            CrossIndustryInvoice
        );
        expect(xml).toMatchInlineSnapshot(`"<p0:CrossIndustryInvoice xmlns:p0="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"><p0:ExchangedDocumentContext><p1:GuidelineSpecifiedDocumentContextParameter xmlns:p1="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"><p1:ID>placeholder-id-for-testing</p1:ID></p1:GuidelineSpecifiedDocumentContextParameter><p1:GuidelineSpecifiedDocumentContextParameter2 xmlns:p1="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"><p1:ID>placeholder-id-for-testing-2</p1:ID></p1:GuidelineSpecifiedDocumentContextParameter2></p0:ExchangedDocumentContext></p0:CrossIndustryInvoice>"`);
    });
})
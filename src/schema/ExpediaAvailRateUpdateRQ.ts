import { XMLRoot, XMLElement, XMLArray, XMLAttribute } from '../decorators';

export class Authentication {
    @XMLAttribute()
    username: string = "";

    @XMLAttribute()
    password: string = "";
}

// TODO: declare namespace on type as default if element doesn't set
// @XMLType({namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06"})
export class DateRange {
    @XMLAttribute()
    from: Date = null as any;

    @XMLAttribute()
    to: Date = null as any;

    @XMLAttribute()
    sun?: boolean;

    @XMLAttribute()
    mon?: boolean;

    @XMLAttribute()
    tue?: boolean;

    @XMLAttribute()
    wed?: boolean;

    @XMLAttribute()
    thu?: boolean;

    @XMLAttribute()
    fri?: boolean;

    @XMLAttribute()
    sat?: boolean;
}

export class AvailRateUpdate {
    @XMLArray({name: "DateRange", namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06", itemType: DateRange, nested: false})
    dateRange: DateRange[] = null as any;

    @XMLElement({name: "RoomType", namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06"})
    roomType?: any;
}

export class Hotel {
    @XMLAttribute()
    id: number = 0;
}

@XMLRoot({namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06"})
export class AvailRateUpdateRQ {

    @XMLElement({name: "Authentication", namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06"})
    authentication: Authentication = null as any;

    @XMLElement({name: "Hotel", namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06"})
    hotel: Hotel = null as any;

    /*
    Legacy
    @XMLElement({name: "DateRange", namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06"})
    dateRange?: any;

    @XMLElement({name: "RoomType", namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06"})
    roomType?: any;*/

    @XMLArray({name: "AvailRateUpdate", namespaceUri: "http://www.expediaconnect.com/EQC/AR/2011/06", itemType: AvailRateUpdate, nested: false})
    availRateUpdate?: AvailRateUpdate[];
}

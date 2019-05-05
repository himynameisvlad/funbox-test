export interface IGeocoderMetaData {
  GeocoderMetaData: {
    Address: IAddress;

    AddressDetals: IAddressDetals;

    InternalToponymInfo: IInternalToponymInfo;

    id: string;

    kind: string;

    precision: string;

    text: string;
  };
}

interface IAddress {
  Components: IAddressComponent[];

  country_code: string;

  formatted: string;
}

interface IAddressComponent {
  kind: string;

  name: string;
}

interface IAddressDetals {
  Country: {
    AddressLine: string;

    CountryName: string;

    CountryNameCode: string;
  };
}

interface IInternalToponymInfo {
  MatchedComponent: { kind: string };

  Point: {
    coordinates: [number, number];

    type: string;
  };

  geoid: number;

  houses: number;

  seoname: string;
}

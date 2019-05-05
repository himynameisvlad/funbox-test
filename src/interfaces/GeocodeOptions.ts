export interface IGeocodeOptions {
  results?: number;

  boundedBy?: number[][];

  json?: boolean;

  kind?: string;

  provider?: ymaps.IGeocodeProvider;

  searchCoordOrder?: string;

  skip?: number;

  strictBounds?: boolean;
}

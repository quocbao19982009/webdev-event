// export interface EventInterface {
//   id: string;
//   name: string;
//   slug: string;
//   venue: string;
//   address: string;
//   performers: string;
//   date: string;
//   time: string;
//   description: string;
//   image: string;
// }

export interface EventInterface {
  id: number;
  attributes: {
    name: string;
    slug: string;
    venue: string;
    address: string;
    date: string;
    time: string;
    performers: string;
    description: string;
    image: Image;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}

export interface Image {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  thumbnail: FormatAttribute;
  FormatAttribute: FormatAttribute;
  medium: FormatAttribute;
  small: FormatAttribute;
}

export interface FormatAttribute {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

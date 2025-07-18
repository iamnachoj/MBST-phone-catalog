/*
✅ Phone → basic “list item” for grid (response from /products)
✅ PhoneDetails → completed response from /products/:id
*/

export interface Phone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface PhoneDetailsData {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
  };
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    imageUrl: string;
  }[];
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

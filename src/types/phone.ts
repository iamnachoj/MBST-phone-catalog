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
    colorOptions: {
        name: string;
        hexCode: string;
        imageUrl: string;
    }[];
    storageOptions: StorageOptions[];
    similarProducts: {
        id: string;
        brand: string;
        name: string;
        basePrice: number;
        imageUrl: string;
    }[];
}

export interface StorageOptions {
    capacity: string;
    price: number;
}

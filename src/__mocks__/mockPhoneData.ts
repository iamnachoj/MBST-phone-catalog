import {
  ColorOption,
  Phone,
  PhoneDetailsData,
  SimilarProduct,
  Specs,
  StorageOption,
} from "@/types/phone";

export const mockPhone: Phone = {
  id: "test-id-001",
  brand: "PixelTech",
  name: "Pixel X20",
  basePrice: 799,
  imageUrl: "/images/pixel-x20-front.jpg",
};

export const mockSpecs: Specs = {
  screen: "6.7-inch AMOLED",
  resolution: "3200 x 1440",
  processor: "Snapdragon 8 Gen 3",
  mainCamera: "108 MP Triple Camera",
  selfieCamera: "32 MP Wide-Angle",
  battery: "5000mAh with Fast Charging",
  os: "Android 14",
  screenRefreshRate: "144Hz",
};

export const mockColorOptions: ColorOption[] = [
  {
    name: "Obsidian Black",
    hexCode: "#1c1c1c",
    imageUrl: "/images/pixel-x20-black.jpg",
  },
  {
    name: "Glacier Blue",
    hexCode: "#89CFF0",
    imageUrl: "/images/pixel-x20-blue.jpg",
  },
];

export const mockStorageOptions: StorageOption[] = [
  {
    capacity: "128GB",
    price: 0,
  },
  {
    capacity: "256GB",
    price: 100,
  },
  {
    capacity: "512GB",
    price: 200,
  },
];

export const mockSimilarProducts: SimilarProduct[] = [
  {
    id: "test-id-002",
    brand: "PixelTech",
    name: "Pixel X10",
    basePrice: 599,
    imageUrl: "/images/pixel-x10-front.jpg",
  },
  {
    id: "test-id-003",
    brand: "MegaMobile",
    name: "Mega S12",
    basePrice: 649,
    imageUrl: "/images/mega-s12-front.jpg",
  },
];

export const mockPhoneDetails: PhoneDetailsData = {
  ...mockPhone,
  description:
    "The Pixel X20 is built for speed, photography, and endurance — equipped with a cutting-edge Snapdragon chip and a brilliant AMOLED screen.",
  rating: 4.7,
  specs: mockSpecs,
  colorOptions: mockColorOptions,
  storageOptions: mockStorageOptions,
  similarProducts: mockSimilarProducts,
};

export const mockPhones: Phone[] = [
  { id: "1", name: "iPhone", brand: "Apple", basePrice: 999, imageUrl: "" },
  { id: "2", name: "Galaxy", brand: "Samsung", basePrice: 899, imageUrl: "" },
];

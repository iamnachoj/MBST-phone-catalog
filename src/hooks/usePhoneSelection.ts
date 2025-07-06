import { useState, useMemo } from "react";
import { PhoneDetailsData, StorageOptions } from "@/types/phone";

export function usePhoneSelection(phone: PhoneDetailsData) {
    // COLOR WILL BE PRESELECTED IF ONLY ONE AVAILABLE
    const [selectedColor, setSelectedColor] = useState<string | null>(() => {
        return phone.colorOptions.length ? phone.colorOptions[0].name : null;
    });
    // STORAGE WILL BE PRESELECTED IF ONLY ONE AVAILABLE
    const [selectedStorage, setSelectedStorage] = useState<StorageOptions | null>(() => {
        return phone.storageOptions.length ? phone.storageOptions[0] : null;
    });

    const totalPrice = useMemo(() => {
        return phone.basePrice + (selectedStorage?.price ?? 0);
    }, [phone.basePrice, selectedStorage]);

    const selectedImage = useMemo(() => {
        return (
            phone.colorOptions.find((c) => c.name === selectedColor)?.imageUrl ||
            phone.colorOptions[0]?.imageUrl
        );
    }, [selectedColor, phone.colorOptions]);

    return {
        selectedColor,
        setSelectedColor,
        selectedStorage,
        setSelectedStorage,
        totalPrice,
        selectedImage,
    };
}

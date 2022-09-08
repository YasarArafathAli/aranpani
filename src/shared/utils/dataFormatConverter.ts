export const buildFormData = (formData: any, data: any, parentKey?: any) => {
    if(Array.isArray(data)) {
        data.forEach((dataItem: any) => {
            formData.append(`${parentKey}`, dataItem);
        });
    } else {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach((key: any) => {
                buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data === null ? '' : data;
            formData.append(parentKey, value);
        }
    }
};

export function convertJSONToFormData(data: any) {
    const formData = new FormData();

    buildFormData(formData, data);

    return formData;
}

export const removeFalsyKeys = (object: any) => {
    if (!Object.keys(object).length) return
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            if (!(object as any)[key])
                delete (object as any)[key]
        }
    }
    return object
}
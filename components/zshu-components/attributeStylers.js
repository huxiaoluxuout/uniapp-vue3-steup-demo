export const attributeStylers = (item, keyMap = []) => {
    console.log('attributeStylers')
    const originalArray = ['flex', 'backgroundColor', 'filter', 'color'];
    const keyMaps = [...new Set(originalArray.concat(keyMap))];
    return keyMaps.reduce((acc, key) => {
        const value = item[key];
        if (value !== null && value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {});
};

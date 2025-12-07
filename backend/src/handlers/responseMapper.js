
export const responseMapper = (schema, data) => {
    let result = {};
    //1 if not got anything just retun an object
    if (!schema || !data) {
        return {}
    }
    // check if incoming schema is string, so convert into array
    if (typeof schema === 'string') {
        schema = schema.split(" ");
    }


    //if incoming data is in array, map through each item
    if (Array.isArray(data) && data.length) {
        result = data.map(item => {
            let mappedItem = {};
            schema.forEach(field => {
                if (item.hasOwnProperty(field)) {
                    mappedItem[field] = item[field];
                }
            });
            return mappedItem;
        });

    } else {
        //2: loop through schema and pick data from original data
        Object.keys(data).forEach((field) => {
            if (schema.includes(field)) {
                result[field] = data[field];
            }
        });
    }
    return result;
}
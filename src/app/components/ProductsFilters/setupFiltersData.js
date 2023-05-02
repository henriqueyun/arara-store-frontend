export function setupFiltersData(products) {
    let fields = products.reduce((accProducts, product) => {
        return [...accProducts, ...Object.keys(product)]
    }, [])



    const uniqueFields = removeDuplicatedFields([...fields])
    const filterableFields = excludeNotFilterableFields(uniqueFields)
    const fieldsWithFilterableValues = getFilterFieldValuesFromProducts(filterableFields, products)
    return fieldsWithFilterableValues
}

function excludeNotFilterableFields(fields) {
    const excludedFields = [
        "createdAt",
        "updatedAt",
        "quantity",
        "description",
        "id",
        "image",
    ]
    return fields.filter(field => !excludedFields.includes(field))
}
function removeDuplicatedValues(values) {
    return [...new Set([...values])]
}


function removeDuplicatedFields(fields) {
    return [...new Set([...fields])]
}

function removeFalsyValues(values) {
    return values.filter(value => !!value)
}

function getFilterFieldValuesFromProducts(fields, products) {
    const fieldsWithValues = fields.map(field => {
        let values = products.map(product => {
            return product[field]
        })
        values = removeDuplicatedValues(values)
        values = removeFalsyValues(values)

        return { field, values }
    })
    return fieldsWithValues
}
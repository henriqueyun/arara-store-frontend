function includeFilterableFields(fields) {
  const includeFields = [
    'name',
    'color',
    'size',
    'brand',
    'price',
    'discount',
  ];
  return fields.filter((field) => includeFields.includes(field));
}
function removeDuplicatedValues(values) {
  return [...new Set([...values])];
}

function removeDuplicatedFields(fields) {
  return [...new Set([...fields])];
}

function removeFalsyValues(values) {
  return values.filter((value) => !!value);
}

function getFilterFieldValuesFromProducts(fields, products) {
  const fieldsWithValues = fields.map((field) => {
    let values = products.map((product) => product[field]);
    values = removeDuplicatedValues(values);
    values = removeFalsyValues(values);

    return { field, values };
  });
  return fieldsWithValues;
}

export default function setupFiltersData(products) {
  const fields = products.reduce(
    (accProducts, product) => [...accProducts, ...Object.keys(product)],
    [],
  );

  const uniqueFields = removeDuplicatedFields([...fields]);
  const filterableFields = includeFilterableFields(uniqueFields);
  const fieldsWithFilterableValues = getFilterFieldValuesFromProducts(
    filterableFields,
    products,
  );
  return fieldsWithFilterableValues;
}

import React, { useEffect, useState } from 'react';
import {
  Checkbox, FormControlLabel, Grid, Stack,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { formatCurrency } from '../util';

export default function ProductsFilter(props) {
  const { products } = props;
  const [productsFilters, setProductsFilters] = useState([]);
  function removeDuplicatedValues(values) {
    return [...new Set([...values])];
  }

  function getFilterFieldValues(fields) {
    const fieldsWithValues = fields.map((field) => {
      const values = products.map((product) => product[field]);
      return { field, values: removeDuplicatedValues(values) };
    });
    return fieldsWithValues;
  }

  // TODO: upgrade this code, maybe create a new endpoint or make this translation in backend, idk
  function getFiltersWithTranslatedFields(filters) {
    const translatedToPortugueseFields = {
      name: 'Produto',
      color: 'Cor',
      size: 'Tamanho',
      brand: 'Marca',
      price: 'Preço',
      discount: 'Desconto',
    };
    return filters.map((filter) => {
      filter.field = translatedToPortugueseFields[filter.field];
      return filter;
    });
  }

  function excludeNotFilterableFields(fields) {
    const excludedFields = [
      'createdAt',
      'updatedAt',
      'quantity',
      'description',
      'id',
      'image',
    ];
    return fields.filter((field) => !excludedFields.includes(field));
  }

  function getProductsFilters() {
    const fields = products
      .reduce((accProducts, product) => [...accProducts, ...Object.keys(product)], []);

    const uniqueFields = removeDuplicatedValues([...fields]);
    const filterableFields = excludeNotFilterableFields(uniqueFields);
    const fieldsWithFilterableValues = getFilterFieldValues(filterableFields);
    const translatedFields = getFiltersWithTranslatedFields(fieldsWithFilterableValues);
    setProductsFilters(translatedFields);
  }

  useEffect(() => {
    if (products.length) { getProductsFilters(); }
  }, [products]);

  function formatLabelByField(field, value) {
    if (!['Desconto', 'Preço'].includes(field)) {
      return value;
    }

    return field === 'Desconto' ? `${value}%` : formatCurrency(value);
  }

  return (
    <Grid>
      {productsFilters.length && productsFilters.map((filter) => (filter.values
        ? (
          <Accordion key={filter.field}>
            <AccordionSummary
              expandIcon={<AddIcon color="primary" />}
            >
              {filter.field}
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                {filter.values.map((value) => (
                  <FormControlLabel
                    control={<Checkbox />}
                    label={formatLabelByField(filter.field, value)}
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )
        : null))}
    </Grid>
  );
}

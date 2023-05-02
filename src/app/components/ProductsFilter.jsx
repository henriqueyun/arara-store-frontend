import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { formatCurrency } from "../util"

// TODO: refactor, separate the setup of filter data from component mounting
export default function ProductsFilter(props) {
    const { products, handleFilter } = props;

    const [productsFilters, setProductsFilters] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});

    function getFilterFieldValues(fields) {
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

    function removeFalsyValues(values) {
        return values.filter(value => !!value)
    }

    function getTranslatedField(field) {
        const translatedToPortugueseFields = {
            name: "Produto",
            color: "Cor",
            size: "Tamanho",
            brand: "Marca",
            price: "Preço",
            discount: "Desconto"
        }
        return translatedToPortugueseFields[field]
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

    function getProductsFilters() {
        let fields = products.reduce((accProducts, product) => {
            return [...accProducts, ...Object.keys(product)]
        }, [])

        const uniqueFields = removeDuplicatedValues([...fields])
        const filterableFields = excludeNotFilterableFields(uniqueFields)
        const fieldsWithFilterableValues = getFilterFieldValues(filterableFields)
        setProductsFilters(fieldsWithFilterableValues)
    }

    useEffect(() => {
        if (products.length)
            getProductsFilters()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    function formatLabelByField(field, value) {
        if (!["Desconto", "Preço"].includes(field)) {
            return value
        }

        return field === "Desconto" ? `${value}%` : formatCurrency(value);
    }
    // TODO: divide in separeted in functions
    function handleFieldChange(event) {
        const [field, value] = event.target.value.split("-")
        setActiveFilters(oldActiveFilters => {
            const fieldValues = oldActiveFilters[field] ? Object.values(oldActiveFilters[field]) : [];
            if (event.target.checked) {
                oldActiveFilters[field] = [...fieldValues, value];
            } else {
                oldActiveFilters[field] = removeValueFromValues(value, fieldValues)
                /* if filter remains with no values remove it key. When checking filters if
                 there is filters blank values keys will return that filters are truthy 
                 (when they're nothing but just blank key) */
                if (oldActiveFilters[field].length === 0) {
                    delete oldActiveFilters[field]
                }
            }
            return { ...oldActiveFilters }
        })

        handleFilter(activeFilters)

        function removeValueFromValues(value, values) {
            return values.filter(v => v !== value)
        }
    }

    function getCheckedFieldValue(field, value) {
        if (activeFilters[field]) {
            return activeFilters[field].includes(value.toString(10))
        }
        return false
    }

    return (
        <Grid>
            {productsFilters.length && productsFilters.map(filter =>
                filter.values ?
                    <Accordion key={filter.field} >
                        <AccordionSummary
                            expandIcon={<AddIcon color="primary"></AddIcon>}
                        >
                            {getTranslatedField(filter.field)}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack>
                                {filter.values.map(value => (
                                    <FormControlLabel
                                        key={`${filter.field}-${value}`}
                                        control={<Checkbox />}
                                        label={formatLabelByField(filter.field, value)}
                                        value={`${filter.field}-${value}`}
                                        checked={getCheckedFieldValue(filter.field, value)}
                                        onChange={handleFieldChange}
                                    />))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    : <></>
            )}
        </Grid >
    )
}
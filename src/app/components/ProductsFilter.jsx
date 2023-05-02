import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { formatCurrency } from "../util"

export default function ProductsFilter(props) {
    const { products } = props;
    const [productsFilters, setProductsFilters] = useState([]);
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

    // TODO: upgrade this code, maybe create a new endpoint or make this translation in backend, idk
    function getFiltersWithTranslatedFields(filters) {
        const translatedToPortugueseFields = {
            name: "Produto",
            color: "Cor",
            size: "Tamanho",
            brand: "Marca",
            price: "Preço",
            discount: "Desconto"
        }
        return filters.map(filter => {
            filter.field = translatedToPortugueseFields[filter.field]
            return filter
        })
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
        const translatedFields = getFiltersWithTranslatedFields(fieldsWithFilterableValues)
        setProductsFilters(translatedFields)
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

    return (
        <Grid>
            {productsFilters.length && productsFilters.map(filter =>
                filter.values ?
                    <Accordion key={filter.field} >
                        <AccordionSummary
                            expandIcon={<AddIcon color="primary"></AddIcon>}
                        >
                            {filter.field}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack>
                                {filter.values.map(value => (
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={formatLabelByField(filter.field, value)}
                                    />))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    : <></>
            )}
        </Grid >
    )
}
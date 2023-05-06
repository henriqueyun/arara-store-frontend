import { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { formatCurrency } from "../../util"
import { setupFiltersData } from "./setupFiltersData";
import { theme } from "../../theme/Theme";

export default function ProductsFilter(props) {
    const { products, handleFilter } = props;

    const [productsFilters, setProductsFilters] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});


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

    useEffect(() => {
        if (products.length)
            setProductsFilters(setupFiltersData(products))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    useEffect(() => {
        handleFilter(activeFilters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilters])


    function formatLabelByField(field, value) {
        if (!["discount", "price"].includes(field)) {
            return value
        }
        return field === "discount" ? `${value}%` : formatCurrency(value);
    }

    function handleFieldChange(event) {
        const [field, value] = event.target.value.split("-")
        setActiveFilters(oldActiveFilters => {
            const fieldValues = oldActiveFilters[field] ? Object.values(oldActiveFilters[field]) : [];
            if (event.target.checked) {
                oldActiveFilters[field] = addFieldValue(fieldValues, value);
            } else {
                oldActiveFilters[field] = removeValueFromValues(value, fieldValues)
                removeFieldFromFiltersWhenValueAreEmpty(oldActiveFilters, field)
            }
            return { ...oldActiveFilters }
        })

        function removeFieldFromFiltersWhenValueAreEmpty(filters, field) {
            if (filters[field].length === 0) {
                delete filters[field]
            }
        }

        function addFieldValue(values, value) {
            return [...values, value]
        }

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

    function cleanFilters() {
        setActiveFilters([])
    }

    return (
        // TODO: refactor and split in components
        <Grid>
            {productsFilters.length && productsFilters.map(filter =>
                filter.values ?
                    <Accordion key={filter.field} >
                        <AccordionSummary
                            expandIcon={<AddIcon sx={{ color: (theme) => theme.palette.background.default }}></AddIcon>}
                        >
                            {<Typography color="background.default">{getTranslatedField(filter.field)}</Typography>}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack>
                                {filter.values.map(value => (
                                    <FormControlLabel
                                        key={`${filter.field}-${value}`}
                                        control={<Checkbox style={{
                                            color: theme.palette.background.default,
                                        }} />}
                                        label={<Typography color="background.default">{formatLabelByField(filter.field, value)}</Typography>}
                                        value={`${filter.field}-${value}`}
                                        checked={getCheckedFieldValue(filter.field, value)}
                                        onChange={handleFieldChange}
                                    />))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    : <></>
            )}
            <Grid py={2}>
                <Button onClick={cleanFilters} variant="outlined" fullWidth={true}>Limpar Filtros</Button>
            </Grid>
        </Grid >
    )
}
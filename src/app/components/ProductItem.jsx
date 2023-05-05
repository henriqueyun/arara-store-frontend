import { Typography } from "@mui/material";
import { calculateDiscount, formatCurrency } from "../util"
export default function ProductItem(props) {
    const { product } = props;
    return (
        <div>
            <img
                src={product.image}
                alt="Um homem estiloso olhando para a camêra de costas para uma parede preta"
                style={{ width: "300px", height: "450px" }}
            ></img>
            <Typography variant="h6">{product.name}</Typography>
            <Price price={product.price} discount={product.discount}></Price>
        </div>
    );
}

function Price(props) {
    const { price, discount } = props
    return (
        <div>
            {
                discount > 0 ?
                    (
                        <>
                            <Typography variant="caption">
                                <s>{formatCurrency(price)}</s>
                            </Typography>
                            <Typography variant="h6">{formatCurrency(calculateDiscount(price, discount))}</Typography>
                        </>) : (
                        <>
                            <Typography variant="h6">{formatCurrency(parseFloat(price))}</Typography>
                        </>)
            }
        </div>
    )
}
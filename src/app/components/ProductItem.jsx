import { Typography } from "@mui/material";

export default function ProductItem(props) {
    const { product } = props;
    return (
        <div>
            <img
                src="https://images.unsplash.com/photo-1519764622345-23439dd774f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGJveXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="Um homem estiloso olhando para a camêra de costas para uma parede preta"
            ></img>
            <Typography variant="h6">{product.name}</Typography>
            <Price price={product.price} discount={product.discount}></Price>
        </div>
    );
}

function Price(props) {
    const { price, discount } = props
    function calculateDiscount(price, discount) {
        return price - ((price / 100) * discount)
    }

    function formatCurrency(value) {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    return (
        <div>
            {discount > 0 ?
                (
                    <>
                        <Typography variant="caption">
                            <s>{formatCurrency(price)}</s>
                        </Typography>
                        <Typography variant="h6">{formatCurrency(calculateDiscount(price, discount))}</Typography>
                    </>) : (
                    <>
                        <Typography variant="h6">{formatCurrency(price)}</Typography>
                    </>)
            }
        </div>
    )
}
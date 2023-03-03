import { Typography } from "@mui/material";

export default function ProductItem(props) {
    const { product } = props;
    return (
        <div>
            <img src="https://images.unsplash.com/photo-1519764622345-23439dd774f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGJveXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Um homem estiloso olhando para a camêra de costas para uma parede preta"></img>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="caption"><s>R$ {product.price + 100}</s></Typography>
            <Typography variant="caption">R$ {product.price}</Typography>
        </div>
    )
}
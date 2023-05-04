import { useParams } from "react-router-dom";

export default function ProductDetails() {

    let { id } = useParams();

    return (`Product exhibition ${id}`)
}
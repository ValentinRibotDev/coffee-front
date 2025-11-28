import { Navigation } from "../Components/NavBar"
import {useState} from "react";

export function Cart() {
const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/cart/${id}`, {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setCart(data);
            }
        }
        catch (err) {
            console.error("Erreur fetch des cart:", err,);
        }
    };

  return (
    <>
        <Navigation/>
        <p></p>
    </>
  )
}
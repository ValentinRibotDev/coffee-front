import { Navigation } from "../Components/NavBar"
import {useEffect, useState} from "react";

export function Cart() {
    const [cart, setCart] = useState([]);

    // const fetchCart = async () => {
    //     try {
    //         const res = await fetch(`http://localhost:8080/api/cart/${id}`, {
    //             method: "GET",
    //             credentials: "include",
    //         });

    //         if (res.ok) {
    //             const data = await res.json();
    //             setCart(data);
    //         }
    //     }
    //     catch (err) {
    //         console.error("Erreur fetch des cart:", err,);
    //     }
    // };

    const updateQuantity = async (id, newQuantity) => {
        try {
            const res = await fetch(`http://localhost:8080/api/cart/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (!res.ok) {
                console.error("Erreur API UPDATE");
                return;
            }

            // Mise à jour dans le state local
            setCart((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );

        } catch (e) {
            console.error("Erreur UPDATE:", e);
        }
    };

    const removeFromCart = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/cart/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                console.error("Erreur API DELETE");
                return;
            }

            // Si OK → mettre à jour le state local
            setCart((prevCart) => prevCart.filter((item) => item.id !== id));

        } catch (error) {
            console.error("Erreur suppression:", error);
        }
    };

    useEffect(() => {
        setCart([
            { id: 1, name: "Coffee", price: 5, quantity: 2 },
            { id: 2, name: "Tea", price: 3, quantity: 1 },
        ]);
    }, []);

    return (
        <>
            <Navigation/>
            <h1>Your Cart</h1>
            <ul>
                {cart.map((item) => (
                    <div className="bg-stone-900 text-white p-2 mb-1 border border-white" key={item.id}>

                        <div className="flex justify-between roboto-bold">
                            <div className="w-1/5">{item.name}</div>                            
                            <div className="w-1/5">Prix unitaire: ${item.price}</div>
                            <div className="w-1/5">
                                Quantité:
                                <select
                                    className="bg-black border px-2 ml-1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQuantity(item.id, Number(e.target.value))
                                    }
                                >
                                    <option value={item.quantity}>
                                        {item.quantity}
                                    </option>

                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/5">Sous-total: ${item.price * item.quantity}</div>
                            <div className="w-1/5 flex justify-end">
                                <button className="bg-red-500 text-white p-1 w-[30px] rounded" onClick={() => removeFromCart(item.id)}>X</button>
                            </div>
                        </div>
                         
                    </div>
                ))}
            </ul>
            <p>
                Total Price: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
            </p>
        </>
    )
}
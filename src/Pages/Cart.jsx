import { Navigation } from "../Components/NavBar"
import {useEffect, useState} from "react";

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
    fetchCart();

    const updateQuantity = async (id, newQuantity) => {
        try {
            const res = await fetch(`http://localhost:8080/api/cart/${id}`, {
                method: "PATCH",
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

    return (
        <>
            <Navigation/>
            <h1>Your Cart</h1>
            <ul className="m-0 p-2 bg-stone-800">
                {cart.map((item) => (
                    <div className="cartGradient p-2 mb-1 border border-white rounded" key={item.id}>

                        <div className="flex justify-between roboto-bold">
                            <div className="w-1/5 flex justify-start items-center">{item.name}</div>  
                            <div className="w-3/5 flex flex-col  md:flex-row justify-around items-start md:items-center">
                                <div className="w-full flex justify-start items-center">Prix unitaire: ${item.price}</div>
                                <div className="w-full flex justify-start items-center">
                                    Quantité: 
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                                        className="text-black border rounded"
                                    >
                                        {/* Valeur actuelle affichée mais introuvable dans les options */}
                                        <option value={item.quantity} hidden>
                                            {item.quantity}
                                        </option>

                                        {/* Liste des quantités possibles (1 à 10) sans l'actuelle */}
                                        {[...Array(10)].map((_, i) => {
                                            const qty = i + 1;
                                            return qty !== item.quantity ? (
                                                <option key={qty} value={qty}>
                                                    {qty}
                                                </option>
                                            ) : null;
                                        })}
                                    </select>
                                </div>
                                <div className="w-full flex justify-start items-center">Sous-total: ${item.price * item.quantity}</div>    
                            </div>                          
                            
                            <div className="w-1/5 flex justify-end">
                                <button className="bg-red-500 text-white p-1 w-[60px] rounded" onClick={() => removeFromCart(item.id)}>X</button>
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
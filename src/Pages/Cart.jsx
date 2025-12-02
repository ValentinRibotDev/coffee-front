import { Navigation } from "../Components/NavBar"
import {useEffect, useState} from "react";

export function Cart() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // Récupérer l'utilisateur connecté depuis /api/me
    const fetchCurrentUser = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/me', {
                method: 'GET',
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setUserId(data.id);
                return data.id;
            } else if (res.status === 401) {
                console.error("Non authentifié");
                setLoading(false);
                return null;
            }
        } catch (err) {
            console.error("Erreur fetch user:", err);
            setLoading(false);
            return null;
        }
    };

    // Récupérer les informations des produits
    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/produits', {
                method: 'GET',
            });
            if (res.ok) {
                const data = await res.json();
                const productsMap = {};
                data.forEach(product => {
                    productsMap[product.id] = product;
                });
                setProducts(productsMap);
            }
        } catch (err) {
            console.error("Erreur fetch produits:", err);
        }
    };

    const fetchCart = async (currentUserId) => {
        if (!currentUserId) {
            console.error("User non connecté");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/cart/${currentUserId}`, {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setCart(data.items || []);
            } else if (res.status === 401) {
                console.error("Non autorisé - token invalide ou expiré");
            }
        } catch (err) {
            console.error("Erreur fetch du panier:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (!userId) return;

        try {
            const res = await fetch(`http://localhost:8080/api/cart/${userId}/update`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    product_id: productId,
                    quantite: parseInt(newQuantity)
                }),
            });

            if (!res.ok) {
                console.error("Erreur API UPDATE");
                return;
            }

            // Mise à jour dans le state local
            setCart((prev) =>
                prev.map((item) =>
                    item.product_id === productId
                        ? { ...item, quantite: parseInt(newQuantity) }
                        : item
                )
            );

        } catch (e) {
            console.error("Erreur UPDATE:", e);
        }
    };

    const removeFromCart = async (productId) => {
        if (!userId) return;

        try {
            const res = await fetch(`http://localhost:8080/api/cart/${userId}/remove`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ product_id: productId }),
            });

            if (!res.ok) {
                console.error("Erreur API DELETE");
                return;
            }

            // Si OK → mettre à jour le state local
            setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));

        } catch (error) {
            console.error("Erreur suppression:", error);
        }
    };

    const clearCart = async () => {
        if (!userId) return;

        try {
            const res = await fetch(`http://localhost:8080/api/cart/${userId}/clear`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                console.error("Erreur API CLEAR");
                return;
            }

            setCart([]);
        } catch (error) {
            console.error("Erreur vidage panier:", error);
        }
    };

    useEffect(() => {
        const initCart = async () => {
            const currentUserId = await fetchCurrentUser();
            if (currentUserId) {
                await fetchProducts();
                await fetchCart(currentUserId);
            }
        };
        initCart();
    }, []);

    if (loading) {
        return (
            <>
                <Navigation/>
                <div className="text-center p-4">Chargement du panier...</div>
            </>
        );
    }

    if (!userId) {
        return (
            <>
                <Navigation/>
                <div className="text-center p-4">Veuillez vous connecter pour voir votre panier</div>
            </>
        );
    }

    return (
        <>
            <Navigation/>
           
            {/*  HEADER */}
            <div className="container w-full p-2">
                <div className="flex justify-between items-center w-full mb-2 md:pr-3">
                    <h1 className="w-3/4 md:w-9/10 text-2xl font-bold">Votre Panier</h1>
                    {cart.length > 0 && (
                        <button
                            className="w-1/4 md:w-1/10 flex justify-center items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={clearCart}
                        >
                            Reset
                        </button>
                    )}
                </div>
        
                {cart.length === 0 ? (
                    <p className="text-center">Votre panier est vide</p>
                ) : (
                    <>
                        
                        <div className="flex gap-4">

                            {/*  PRODUCTS */}
                            <ul className="m-0 p-0 w-full md:w-1/2">
                                {cart.map((item) => {
                                    const product = products[item.product_id];
                                    if (!product) return null;

                                    return (
                                        <div className="p-2 mb-1 border shadow-sm rounded" key={item.id}>
                                            <div className="flex flex-col justify-between roboto-bold">

                                                <div className="w-full flex justify-between items-start mb-2">
                                                    <div className="w-4/5 flex flex-col">

                                                        <div className="w-full flex justify-start items-center roboto-bold !uppercase text-xl">
                                                            {product.name}
                                                        </div>

                                                        <hr className="w-full mt-2 mb-0"/>   

                                                    </div>
                                                    
                                                    <div className="w-1/5 flex justify-end items-start">
                                                        <button
                                                            className="bg-red-500 text-white p-1 w-[60px] rounded hover:bg-red-600"
                                                            onClick={() => removeFromCart(item.product_id)}
                                                        >
                                                            X
                                                        </button>
                                                    </div>                                                    
                                                </div>

                                                <div className="hidden md:block roboto-regular flex flex-col mt-2">
                                                    <div>

                                                        <u><strong>Information sur le produit</strong></u><br/>

                                                        <div className="text-base">
                                                            {product.description.replace(/<[^>]+>/g, '')}
                                                        </div>

                                                    </div>

                                                    <hr className="w-full"/>  
                                                </div>

                                                <div className="w-full roboto-regular flex justify-between items-center mb-2">
                                                   <div className="w-full roboto-regular flex justify-start items-center gap-1">
                                                        Quantité:

                                                        <div className="flex items-center gap-2">

                                                            {/* BOUTON - */}
                                                            <button
                                                                className="min-w-full text-stone-900 rounded hover:bg-stone-200 border border-stone-900"
                                                                onClick={() => {
                                                                    if (item.quantite > 1) {
                                                                        updateQuantity(item.product_id, item.quantite - 1);
                                                                    }
                                                                }}
                                                            >
                                                                -
                                                            </button>

                                                            {/* AFFICHAGE QUANTITÉ */}
                                                            <span className="min-w-full border rounded bg-white text-black min-w-[40px] text-center">
                                                                {item.quantite}
                                                            </span>

                                                            {/* BOUTON + */}
                                                            <button
                                                                className="min-w-full text-stone-900 rounded hover:bg-stone-200 border border-stone-900"
                                                                onClick={() => {
                                                                    updateQuantity(item.product_id, item.quantite + 1);
                                                                }}
                                                            >
                                                                +
                                                            </button>

                                                        </div>
                                                    </div>

                                                    <div className="w-full roboto-regular flex justify-end items-center">
                                                        <strong>{product.price}€</strong>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    );
                                })}
                            </ul>
                            
                            {/*  FACTURE */}
                            <div className="hidden md:block flex flex-col w-1/2 p-2 mb-1 border shadow-sm rounded">

                                <div className="roboto-bold !uppercase text-2xl mt-2">
                                    Détails de votre commande
                                    <hr/>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <p className="text-xl font-bold">
                                        Total: {cart.reduce((total, item) => {
                                            const product = products[item.product_id];
                                            return total + (product ? product.price * item.quantite : 0);
                                        }, 0).toFixed(2)}€
                                    </p>
                                </div>

                            </div>

                        </div>


                    </>
                )}
            </div>
        </>
    )
}

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
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Votre Panier</h1>

                {cart.length === 0 ? (
                    <p className="text-center">Votre panier est vide</p>
                ) : (
                    <>
                        <ul className="m-0 p-2 bg-stone-800">
                            {cart.map((item) => {
                                const product = products[item.product_id];
                                if (!product) return null;

                                return (
                                    <div className="cartGradient p-2 mb-1 border border-white rounded" key={item.id}>
                                        <div className="flex justify-between roboto-bold">
                                            <div className="w-1/5 flex justify-start items-center">{product.name}</div>
                                            <div className="w-3/5 flex flex-col md:flex-row justify-around items-start md:items-center">
                                                <div className="w-full flex justify-start items-center">
                                                    Prix unitaire: {product.price}€
                                                </div>
                                                <div className="w-full flex justify-start items-center">
                                                    Quantité:
                                                    <select
                                                        value={item.quantite}
                                                        onChange={(e) => updateQuantity(item.product_id, e.target.value)}
                                                        className="text-black border rounded ml-2"
                                                    >
                                                        <option value={item.quantite} hidden>
                                                            {item.quantite}
                                                        </option>
                                                        {[...Array(10)].map((_, i) => {
                                                            const qty = i + 1;
                                                            return qty !== item.quantite ? (
                                                                <option key={qty} value={qty}>
                                                                    {qty}
                                                                </option>
                                                            ) : null;
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="w-full flex justify-start items-center">
                                                    Sous-total: {(product.price * item.quantite).toFixed(2)}€
                                                </div>
                                            </div>

                                            <div className="w-1/5 flex justify-end">
                                                <button
                                                    className="bg-red-500 text-white p-1 w-[60px] rounded hover:bg-red-600"
                                                    onClick={() => removeFromCart(item.product_id)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </ul>

                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-xl font-bold">
                                Total: {cart.reduce((total, item) => {
                                    const product = products[item.product_id];
                                    return total + (product ? product.price * item.quantite : 0);
                                }, 0).toFixed(2)}€
                            </p>

                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={clearCart}
                            >
                                Vider le panier
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

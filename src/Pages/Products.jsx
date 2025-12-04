//React
import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "./AuthContext";

//Component
import { Navigation} from "../Components/NavBar"
import { BannerProduct } from "../Components/BannerProduct"
import { Footer } from "../Components/Footer";
import { Carousel } from "../Components/Carousel";
import { CardProduct } from "../Components/CardProduct";
import { PopUp } from "../Components/PopUp";
import { FilterProduct } from "../Components/FilterProduct";

export default function Products() {

    const { token, refreshToken } = useAuth()

    // Fonction pour décoder le JWT et extraire l'userId
    const getUserIdFromToken = (token) => {
        if (!token) {
            console.error("Token non fourni");
            return null;
        }
        try {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            console.log("Contenu du JWT décodé:", decodedPayload);
            return decodedPayload.userId || decodedPayload.id || decodedPayload.sub;
        } catch (error) {
            console.error("Erreur lors du décodage du token:", error);
            return null;
        }
    };

    const [popupMessage, setPopupMessage] = useState("");
    const [popupColor, setPopupColor] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const showErrorPopup = (message) => {
        setPopupMessage(message);
        setPopupColor("bg-red-500");
        setShowPopup(true);

        setTimeout(() => setShowPopup(false), 3000);
    };

    const addToCart = async (productId, qty = 1) => {
        let currentToken = token;
        const userId = getUserIdFromToken(currentToken);
        

        if (!userId) {
            setPopupMessage("Veuillez vous connecter !");
            setPopupColor("bg-red-500");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return;
        }

        let response = await fetch(`http://localhost:8080/api/cart/${userId}/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentToken}`,
            },
            credentials: "include",
            body: JSON.stringify({ product_id: productId, quantite: qty }),
        });

        if (response.status === 401) {
            // JWT expiré -> refresh via le contexte
            currentToken = await refreshToken();

            if (!currentToken) {
                console.error("Impossible de rafraîchir le token");
                return;
            }

            const newUserId = getUserIdFromToken(currentToken);

            // retry addToCart
            response = await fetch(`http://localhost:8080/api/cart/${newUserId}/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`,
                },
                credentials: "include",
                body: JSON.stringify({ product_id: productId, quantite: qty }),
            });
        }

        if (response.ok) {
            setPopupMessage("Produit ajouté !");
            setPopupColor("bg-green-500");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return await response.json();
        } else {
            setPopupMessage("Erreur lors de l'ajout au panier.");
            setPopupColor("bg-red-500");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return null;
        }
    };

    const { produits } = useOutletContext();

    const products = produits.map((produit, i) => ({
        id: produit.id,
        image: produit.image,
        name: produit.name,
        description: produit.description,
        categorie: produit.categorie,
        intensity: produit.intensity,
        origin: produit.origin,
        price: produit.price,
    }));
    console.log(products)

    /**
     * USE STATE
     */
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [inputValue, setInputValue] = useState("");
    const categories = Array.from(new Set(products.map(p => p.categorie)));

    /**
     * FILTER
     */
    const handleAddToCart = (productId, qty) => {
        addToCart(productId, qty);
    };

    // Filtrage en temps réel
    const filteredProduits = products.filter((produit) => {
        const price = parseFloat(produit.price) || 0;

        // Filtre par prix
        const isPriceOk = price >= minPrice && price <= maxPrice;

        // Filtre par recherche (temps réel)
        const textToSearch = (produit.name + " " + produit.description).toLowerCase();
        const isTextOk = inputValue === "" || textToSearch.includes(inputValue.toLowerCase());

        // Filtre par catégorie (multi-sélection)
        const isCategoryOk = selectedCategories.length === 0 || selectedCategories.includes(produit.categorie);

        return isPriceOk && isTextOk && isCategoryOk;
    });

    return (
        <>
            <div className="flex flex-col bannerBackground">

                <div>
                    <Navigation color={'#fff'} className={'invert'} />
                </div>

                

                <div className="flex flex-col items-center">
                    <div className="overflow-x-hidden flex justify-center select-none w-full">
                        <BannerProduct />
                    </div>

                    <div className="w-full h-56 sm:h-64 lg:h-80 max-w-[1440px] mb-4 bg-blue-300">
                        <Carousel />
                    </div>

                    

                    {/* LAYOUT FILTRES + PRODUITS */}
                    <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center items-center md:items-start gap-4">

                        {/* FILTRES À GAUCHE */}
                        <FilterProduct
                            categories={categories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />

                        {/* PRODUITS À DROITE */}
                        <div className="flex-1 flex flex-col md:flex-row md:flex-wrap lg:flex-col gap-4 justify-center">
                            {filteredProduits.map((produit, index) => (
                                <CardProduct
                                    key={index}
                                    image={produit.image}
                                    name={produit.name}
                                    price={produit.price}
                                    description={produit.description.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
                                    origin={produit.origin}
                                    intensity={produit.intensity}
                                    AddToCart={(qty) => handleAddToCart(produit.id, qty)}
                                    showError={showErrorPopup}
                                />
                            ))}
                        </div>

                    </div>
                </div>

                <div className="hidden items-end col-span-12 h-14 p-1 pointer-events-auto md:flex md:justify-around">
                    <Footer className={'invert'}/>
                </div>

                {showPopup && (
                    <PopUp message={popupMessage} color={popupColor} />
                )}

            </div>
        </>
    )
}
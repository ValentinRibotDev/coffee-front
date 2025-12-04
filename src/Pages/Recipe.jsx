//Components
import { Navigation } from "../Components/NavBar"
import { RecipeBar } from "../Components/recipeBar"
import { BannerRecipe } from "../Components/BannerRecipe"
import { Footer } from "../Components/Footer";
import { useOutletContext, useLocation } from "react-router-dom";
import ModaleRecipe from "../Components/ModaleRecipe";
import React, { useState, useEffect} from "react";

export function Recipe() {
    
    const location = useLocation();
    const { boissons, recettes } = useOutletContext();
    const { currentRecettesIndex, drinkColor: locationDrinkColor } = location.state || {}; 

    const drinkColorFallback = boissons?.[currentRecettesIndex]?.couleur || '#000';
    const drinkColor = locationDrinkColor || drinkColorFallback;

    const currentRecettes = recettes?.[currentRecettesIndex]; 
    const modalId = `modal-${currentRecettesIndex}`;
    const [modalOpen, setModalOpen] = useState(false);

    // Trouve l’index de la recette correspondant à l’id
    useEffect(() => {
        if (currentRecettesIndex !== undefined) setModalOpen(true);
    }, [currentRecettesIndex, locationDrinkColor]);

    const recipeInfo = boissons.map((boisson,i) => ({
        key: i,
        name: boisson.name,
        temps: boisson.temps + " min",
        prix: boisson.prix + "€",
        note: boisson.note,
        image: boisson.imageUrl || boisson.image,
        couleur: boisson.couleur
    }));

    return (
        <>  
            <div className="flex flex-col bannerBackground overflow-x-hidden">

                {/* row 1 = navbar */}
                <div>
                    <Navigation color={'#fff'} className={'invert'} />
                </div>

                {/* row 2 = contenu (bannière + recettes) */}
                <div className="flex flex-col items-center">

                    {/* Bannière */}
                    <div className="overflow-hidden flex justify-center select-none">
                        <BannerRecipe />
                    </div>

                    {/* Recettes */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-5 place-items-center bannerBackground p-3">
                       
                        {recipeInfo.map((boisson, i) => {
                            return (
                                <RecipeBar 
                                    key={i}
                                    index={i}
                                    Name={boisson.name} 
                                    Time={boisson.temps} 
                                    Price={boisson.prix} 
                                    Note={boisson.note}
                                    Image={boisson.image}
                                    HoverColor={boisson.couleur}
                                />
                            );
                        })}
                    </div>

                </div>

                {/* row 3 = footer */}
                <div className="hidden items-end col-span-12 h-14 p-1 pointer-events-auto md:flex md:justify-around">
                    <Footer className={'invert'}/>
                </div>
                
                {modalOpen && currentRecettes && (
                <ModaleRecipe
                    Name={recipeInfo[currentRecettesIndex]?.name}
                    i={currentRecettesIndex}
                    drinkColor={drinkColor}
                    parentOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
                )}   
        </div>
        </>                    
    )
}

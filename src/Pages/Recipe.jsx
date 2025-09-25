//Components
import { Navigation } from "../Components/NavBar"
import { RecipeBar } from "../Components/RecipeBar"
import { BannerRecipe } from "../Components/BannerRecipe"
import { Footer } from "../Components/Footer";
import { useOutletContext } from "react-router-dom";


export function Recipe() {
    
    const { boissons } = useOutletContext();

    const recipeInfo = boissons.map((boisson,i) => ({
        key: i,
        name: boisson.name,
        temps: boisson.temps,
        prix: boisson.prix + "€",
        note: boisson.note + '/10',
        couleur: boisson.couleur
        
    }));
    
    return (
        <>  
            <div className="flex flex-col min-h-screen bannerBackground">

                {/* row 1 = navbar */}
                <div>
                    <Navigation color={'#fff'} className={'invert'} />
                </div>

                {/* row 2 = contenu (bannière + recettes) */}
                <div className="flex flex-col">

                    {/* Bannière */}
                    <div className="overflow-hidden flex justify-center select-none">
                        <BannerRecipe />
                    </div>

                    {/* Recettes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 bannerBackground p-3 auto-rows-[70px]">
                       
                        {recipeInfo.map((boisson, i) => {
                            return (
                                <RecipeBar 
                                    key={i}
                                    index={i}
                                    className="recipeButton"
                                    TextColor="text-white" 
                                    Name={boisson.name} 
                                    Time={boisson.temps} 
                                    Price={boisson.prix} 
                                    Note={boisson.note}
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

            </div>
        </>                    
    )
}

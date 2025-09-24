//Components
import { Navigation } from "../Components/NavBar"
import { RecipeBar } from "../Components/RecipeBar"
import { BannerRecipe } from "../Components/BannerRecipe"

export function Recipe() {
    
    const recipeInfo = [
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5', color: '#d17d2e'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5', color: '#5da3c4'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5', color: '#c50000'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5', color: '#a88256'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5', color: '#badd3d'},
        {nom:"Envou'Temps", temps:"5 min", prix:'20€', note:'4/5', color: '#f172b2'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5', color: '#101010'}
    ]

    return (
        <>  
            <div className="flex flex-col min-h-screen bannerBackground">

                {/* row 1 = navbar */}
                <div className="">
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
                       
                        {recipeInfo.map((element, index) => (
                            <RecipeBar 
                                key={index}
                                className="recipeButton"
                                TextColor="text-white" 
                                Name={element.nom} 
                                Time={element.temps} 
                                Price={element.prix} 
                                Note={element.note}
                                HoverColor={element.color}
                            />
                        ))}

                    </div>

                </div>

                {/* row 3 = footer */}
                <div className="bg-green-300 min-h-[40px]">footer</div>

            </div>
        </>                    
    )
}

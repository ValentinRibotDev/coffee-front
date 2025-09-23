//Components
import { Navigation } from "../Components/NavBar"
import { RecipeBar } from "../Components/recipeBar"

export function Recipe() {

    const recipeInfo = [
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5'},
        {nom:"Envou'Temps", temps:"5 min", prix:'20€', note:'4/5'},
        {nom:"Envou'Temps", temps:"5 min", prix:'10€', note:'4/5'}
    ]

    return (
        <>  
            <div className="grid grid-rows-[40px_auto_1fr_40px] w-full min-h-screen">
                
                {/* Navbar */}
                <div className="bannerBackground">
                    <Navigation color={'#fff'} className={'invert'}/>
                </div>

                {/* Bannière */}
                <div className="bannerBackground overflow-hidden flex justify-center select-none">

                    <img 
                        src="/Banner/bannerRecipe_sm.png" 
                        alt="banner" 
                        className="h-[100px] min-w-[768px] md:hidden"
                        draggable="false"
                    />

                    <img 
                        src="/Banner/bannerRecipe_md.png" 
                        alt="banner" 
                        className="hidden md:block h-[120px] min-w-[1024px] lg:hidden"
                        draggable="false"
                    />

                    <img 
                        src="/Banner/bannerRecipe_xl.png" 
                        alt="banner" 
                        className="hidden lg:block h-[200px] min-w-[1920px]"
                        draggable="false"
                    />

                </div>

                {/* Recettes */}
                <div className="grid grid-cols-8 gap-3 bannerBackground pt-3 pb-3">

                    {recipeInfo.map((element, index) => {
                        return(
                            <RecipeBar 
                                key={index}
                                className="recipeButton" 
                                Name={element.nom} 
                                Time={element.temps} 
                                Price={element.prix} 
                                Note={element.note}
                            />
                        )
                    })}

                </div>

                {/* Footer */}
                <div className="bannerBackground"></div>

            </div>
        </>
    )
}

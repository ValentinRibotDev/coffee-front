import ModaleRecipe from "./ModaleRecipe.jsx"

export function RecipeBar ({ index, className, TextColor, Name, Time, Note, Price, HoverColor }) {
    return(
        <>
            <div className="col-span-8 flex flex-column items-center">
               
                <div className=
                    {` w-full h-full gap-3 
                    flex justify-around items-center 
                    relative overflow-hidden 
                    rounded 
                    recipeBarBackground ${TextColor}`}
                    >

                    <p className="
                        w-1/5 h-full m-0 
                        flex items-center 
                        roboto-bold uppercase text-[0.85rem]
                        md:text-[1.3rem]"
                        >
                        {Name}
                    </p>

                    <p className="
                        w-1/5 h-full m-0
                        hidden 
                        md:flex items-center"
                        >
                        Temps:&nbsp;{Time} min
                    </p>

                    <p className="
                        w-1/5 h-full m-0
                        hidden 
                        lg:flex items-center "
                        >
                        Prix:&nbsp;{Price}
                    </p>

                    <p className="
                        w-1/5 h-full m-0
                        hidden 
                        xl:flex items-center "
                        >
                        Note:&nbsp;{Note}
                    </p>

                    <ModaleRecipe 
                    i={index}
                    Name={Name}
                    className={`${className} w-[120px] h-3/5 rounded roboto-regular `} 
                    style={{"--drinkColor": HoverColor }}/>
                </div>
                
            </div>
        </>
    )
}
export function RecipeBar ({ className, TextColor, Name, Time, Note, Price, HoverColor }) {
    return(
        <>
            <div className="col-span-8 flex flex-column items-center">
               
                <div className=
                    {` w-19/20 h-full 
                    flex justify-around items-center 
                    relative overflow-hidden 
                    rounded 
                    recipeBarBackground ${TextColor}`}
                    >

                    <p className="
                        w-1/5 h-full m-0
                        flex items-center 
                        roboto-bold uppercase"
                        >
                        {Name}
                    </p>

                    <p className="
                        w-1/5 h-full m-0
                        hidden 
                        md:flex items-center "
                        >
                        Temps:{Time}
                    </p>

                    <p className="
                        w-1/5 h-full m-0
                        hidden 
                        lg:flex items-center "
                        >
                        Prix:{Price}
                    </p>

                    <p className="
                        w-1/5 h-full m-0
                        hidden 
                        xl:flex items-center "
                        >
                        Note:{Note}
                    </p>

                    <button className={`${className} w-[120px] h-3/5 rounded roboto-regular`} style={{"--drinkColor": HoverColor }}>See more</button>

                </div>
                
            </div>
        </>
    )
}
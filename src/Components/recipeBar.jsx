export function RecipeBar ({ className, Name, Time, Note, Price }) {
    return(
        <>
            <div className="col-span-8 flex flex-column items-center">
               
                <div className="w-19/20 h-full flex justify-around items-center recipeBarBackground rounded relative overflow-hidden">

                    <p className="w-1/5 h-full flex items-center m-0 roboto-bold uppercase">{Name}</p>
                    <p className="w-1/5 h-full hidden md:flex items-center m-0">Temps:{Time}</p>
                    <p className="w-1/5 h-full hidden lg:flex items-center m-0">Prix:{Price}</p>
                    <p className="w-1/5 h-full hidden xl:flex items-center m-0">Note:{Note}</p>
                    <button className={`${className} w-[120px] h-3/5 rounded roboto-regular`}>See more</button>

                </div>
                
            </div>
        </>
    )
}
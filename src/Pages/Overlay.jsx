import { useOutletContext } from "react-router-dom";
import { Navigation } from "../Components/NavBar"
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export function Overlay({ active, setActive, max }) {

    //HandleActive
    const handlePrev = () => setActive((prev) => (prev - 1 + max) % max)
    const handleNext = () => setActive((prev) => (prev + 1) % max)

    const { boissons } = useOutletContext();

    const htmlDisplay = [
        boissons.map((element, index) => {
            element[index] && { key:[index], name: element[index].name, color: element[index].couleur ,description:element[index].description}                           
        })
    ].filter(Boolean); // supprime les "undefined"

    // ← Ici : si htmlDisplay est vide, on retourne un loader
    if (htmlDisplay.length === 0) {
        return <div className="
        absolute top-0 left-1/2 -translate-x-1/2
        text-center roboto-bold"
        >
        </div>;
    }

    return (
        <>
        
            <div className="
                absolute top-0 left-1/2 -translate-x-1/2
                max-w-[1920px] w-full h-screen
                grid grid-rows-16 grid-cols-12
                pointer-events-none"
                >

                {/* Navbar */}
                <div className="col-span-12 pointer-events-auto">
                    <Navigation color={htmlDisplay[active]?.color|| "#000"}/>
                </div>


                {/* Margin Top */}
                <div className="
                    col-span-12 row-span-12
                    sm:row-span-11
                    xl:row-span-1"
                    >
                </div>

                {/* Section Main */}
                <div className="hidden col-span-4 row-span-12 xl:flex flex-col leading-none items-center mr-15">

                    <div className="w-[60%]">

                        <div className="roboto-regular text-3xl">Take your</div>

                        <div
                            className="roboto-bold text-[8.5rem] leading-none"
                            style={{ color: htmlDisplay[active].color }}
                        >
                            TIME
                        </div>

                        <div className="roboto-regular text-3xl leading-none">Enjoy our</div>

                        <div
                            className="roboto-bold text-[8.5rem] leading-none"
                            style={{ color: htmlDisplay[active].color }}
                        >
                            COFFEE
                        </div>

                    </div>

                </div>

                <div className="
                    hidden col-span-4 row-span-12
                    xl:block"
                    >
                </div>

                {/* INFO */}
                <div className="
                    grid grid-cols-4 col-span-12 row-span-3 ml-3
                    sm:row-span-4
                    xl:col-span-4 xl:col-start-9 xl:row-span-4 xl:row-start-4"        
                    >

                    {/* Previous Next Button */}
                    <div className="
                        col-span-4 pointer-events-auto
                        flex justify-center justify-evenly items-center gap-4
                        sm:col-span-2 sm:order-2 sm:justify-end sm:mr-6
                        lg:col-span-2 lg:order-6 lg:justify-start lg:mr-0
                        xl:ml-8 xl:mt-8"
                        >

                        <button className="
                            w-8 h-8 rounded-full
                            bg-transparent border-2 border-white
                            flex items-center justify-center
                            text-white"
                            onClick={handlePrev}
                            >
                            <GrFormPrevious size={32}  />
                        </button>

                        <button className="
                            w-8 h-8 rounded-full
                            bg-transparent border-2 border-white
                            flex items-center justify-center 
                            text-white"
                            onClick={handleNext}
                            >
                            <GrFormNext size={32}/>
                        </button>

                    </div>

                    {/* Drink Name */}
                    <div className="
                        col-span-4
                        flex justify-center 
                        sm:col-span-2 sm:order-1 sm:justify-start
                        lg:col-span-3 
                        roboto-bold uppercase text-[3rem] m-0 p-0"
                        >
                        {htmlDisplay[active].name}
                    </div>


                    {/* Drink Description */}
                    <div
                    className="
                    hidden col-span-4 order-4 
                    roboto-regular 
                    sm:block 
                    lg:order-3 lg:col-span-3"
                    dangerouslySetInnerHTML={{ __html: htmlDisplay[active].description }}
                    ></div>

                    {/* Nav Button products/recipe */}
                    <div className="
                        col-span-4 order-5 gap-4 pointer-events-auto
                        flex justify-center items-center
                        lg:col-span-2 lg:order-4 lg:justify-start
                        xl:mt-8"
                        >

                        <div className="
                            w-[120px] h-[30px]
                            sm:h-[40px]
                            border
                            rounded-lg
                            flex justify-center items-center
                            text-white uppercase font-bold text-xs
                            cursor-pointer"
                            style={{background:htmlDisplay[active].color}}
                            >
                            Add Product
                        </div>

                        <div className="
                            w-[120px] h-[30px]
                            sm:h-[40px]
                            border
                            rounded-lg bg-stone-600
                            flex justify-center items-center
                            text-white uppercase font-bold text-xs
                            cursor-pointer
                            duration-500 ease-in-out
                            hover:bg-stone-300"
                            >
                            See Recipe
                        </div>

                    </div>


                </div>

                {/* Margin Bottom */}
                <div className="
                    col-span-12 h-[10px]
                    xl:block"
                    >
                </div>

                {/* Footer */}
                <div className="col-span-12 h-12 pointer-events-auto">
                </div>    
            </div>
        </>
    )
}

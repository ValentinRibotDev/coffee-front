import ModaleRecipe from "./ModaleRecipe.jsx"

// Icons
import { IoTimeOutline } from "react-icons/io5";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { TbNote } from "react-icons/tb";
import { useState } from "react";

export function RecipeBar ({ index, Name, Time, Note, Price, Image, HoverColor }) {

    const [isFavorite, setIsFavorite] = useState(false);

    return(
        <>
            <div className="w-[300px] flex flex-col justify-center items-center hover:scale-98 transition">

                <div 
                    className="relative border-t border-l border-r border-white rounded-t w-full h-[300px] overflow-hidden flex justify-center items-end"
                    style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <button
                        className="
                            h-[50px]
                            absolute 
                            top-2 right-2  
                            flex justify-center items-center"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        {!isFavorite ? (
                            <img
                                src="/Products/favIconEmpty.png"
                                alt="favEmpty"
                                className="h-full w-auto object-contain buttonFav invert"
                            />
                        ) : (
                            <img
                                src="/Products/favIconFull.png"
                                alt="favFull"
                                className="h-full w-auto object-contain buttonFav"
                            />
                        )}
                    </button>

                    <div className="
                        w-3/5 h-[30px]
                        flex justify-center items-center 
                        bg-white rounded-t 
                        roboto-regular !font-bold uppercase"
                    >
                        {Name}
                    </div>
                    
                </div>

                <div className=" w-full rounded-b h-[100px] overflow-hidden">
                    <div className="w-full h-1/2 bg-white border-b border-gray-200">

                        <div className="w-full h-full flex justify-around items-center">
                            
                            <p className="m-0 roboto-regular flex justify-center items-center">
                                <TbNote size={'25px'}/>
                                &nbsp;{Note}
                            </p>

                            <p className="m-0 roboto-regular flex justify-center items-center">
                                <IoTimeOutline size={'25px'}/>
                                &nbsp;{Time}
                            </p>

                            <p className="m-0 roboto-regular flex justify-center items-center">
                                <RiMoneyEuroCircleLine size={'25px'}/>
                                &nbsp;{Price}
                            </p>

                            

                        </div>

                    </div>

                    <div className="w-full h-1/2 bg-white flex justify-around items-center">
                        <ModaleRecipe 
                            i={index}
                            Name={Name}
                            drinkColor={HoverColor} 
                            style={{"--drinkColor": HoverColor }}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}
import ModaleRecipe from "./ModaleRecipe.jsx"

// Icons
import { IoTimeOutline } from "react-icons/io5";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa6";

export function RecipeBar ({ index, Name, Time, Note, Price, Image, HoverColor }) {

    return(
        <>
            <div className="w-[300px] flex flex-col justify-center items-center hover:scale-98 transition">

                <div 
                    className="relative border-t border-l border-r border-white rounded-t w-full h-[300px] overflow-hidden flex justify-center items-end"
                    style={{ backgroundImage: `url(/boissons/${Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >

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
                                <FaRegStar size={'25px'}/>
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

            {/* <div className="col-span-8 flex flex-column items-center">
               
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
                        Temps:&nbsp;{Time}
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
                    drinkColor={HoverColor} 
                    style={{"--drinkColor": HoverColor }}/>
                </div>
                
            </div> */}
        </>
    )
}
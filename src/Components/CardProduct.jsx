import { useState } from "react"
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Flag from "../Components/Flag";

export function CardProduct ({image, name, price, description, origin, intensity}) {
    console.log(image);
const [isFavorite, setIsFavorite] = useState(false)

    return(
        <>
            <div className="w-[320px] max-h-[500px] border">

                <img src={`http://localhost:8080/uploads/image/${image}`}  alt="img" className="w-full h-[320px] p-2"/>

                <div className="w-full h-[180px] p-2 cardBackground text-black">

                    <div className="flex justify-between items-center h-1/4">
                        <p className="roboto-bold text-2xl m-0">{name}</p>
                        <p className="roboto-bold text-2xl m-0">{price}€</p>  
                    </div>

                    <hr className="m-0"/>
                    
                    <p className="roboto-regular test-xs h-1/4 ">{description}</p>

                    <div className="flex justify-between items-center h-1/4">
                        <p className="roboto-regular m-0">Origine: <Flag countryCode={origin} /></p>
                        <p className="roboto-regular m-0">Intensité: {intensity}/10</p>    
                    </div>

                    <div className="flex justify-between items-center h-1/4">

                        <button className="w-[40px] h-[40px] rounded buttonFav" onClick={()=>setIsFavorite(!isFavorite)}>

                            {!isFavorite ? (
                                <div className="flex w-full h-full items-center">
                                    <img src="/Products/favIconEmpty.png" alt="favEmpty" className="h-full w-auto object-contain"/>      
                                </div>   
                            ):(
                                <div className="flex w-full h-full items-center">
                                    <img src="/Products/favIconFull.png" alt="favFull" className="h-full w-auto object-contain"/>  
                                </div>
                            )}
                                   
                        </button>

                        <button className="w-[150px] h-full flex justify-end items-center rounded roboto-bold buttonAddCart text-right pr-2">
                            Add to cart
                            <MdOutlineArrowForwardIos/>
                        </button>    

                    </div>

                </div>
                
            </div>          
        </>
    )
}
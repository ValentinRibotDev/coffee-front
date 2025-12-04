import { useState } from "react"
import Flag from "../Components/Flag";
import { FaCheck } from "react-icons/fa6";

export function CardProduct({ image, name, price, description, origin, intensity, AddToCart, showError }) {

    const [isFavorite, setIsFavorite] = useState(false)
    const [qty, setQty] = useState("1"); // stocké en string pour pouvoir vider l'input

    const handleValidate = () => {
        const quantity = parseInt(qty); // conversion en nombre
        if (!quantity || quantity <= 0) {
            showError("Valeur incorrecte");
            return;
        }
        AddToCart(quantity);
        setQty("1"); // reset à 1
    };

    return(
        <>
        <div className="min-w-[900px] max-w-[900px] flex">
            <div className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] p-1 bg-white">
                <img src={`http://localhost:8080/uploads/image/${image}`}  alt="img"
                    className="h-full object-cover"
                />
            </div>

            <div className="w-full p-2 text-white flex flex-col">
                <div className="flex w-full gap-x-5 mb-2">
                    <p className="roboto-bold uppercase text-3xl m-0">
                        {name}
                    </p>

                    <button
                        className="w-[40px] h-[40px] ml-10 buttonFav mt-1"
                        onClick={()=>setIsFavorite(!isFavorite)}
                    >
                        {!isFavorite ? (
                            <img src="/Products/favIconEmpty.png" alt="favEmpty"
                                className="h-full w-auto object-contain invert"
                            />
                        ) : (
                            <img src="/Products/favIconFull.png" alt="favFull"
                                className="h-full w-auto object-contain"
                            />
                        )}
                    </button>    
                </div>
                
                {/* DESCRIPTION + ORIGIN + INTENSITE */}
                <div className="flex justify-between w-full gap-x-2">

                    <div className="w-full">
                        <p className="roboto-regular text-xl m-0">
                            Description :
                        </p>

                        <p className="roboto-regular test-xs m-0">
                            {description}
                        </p>    
                    </div>

                </div>

                <hr className="mb-3 mt-2"/>

                <div className="flex justify-between">
                    <div className="w-1/2 flex items-center gap-x-2">
                        <p className="roboto-regular text-xl m-0">
                            Origine :  
                        </p>

                        <p className="">
                           <Flag countryCode={origin} /> 
                        </p>
                    </div>
                    
                    {intensity !== undefined && (
                        <div className="w-1/2 flex items-center justify-end gap-x-2">
                            <p className="roboto-regular text-xl">
                                Intensité :
                            </p>

                            <p className="roboto-regular">
                                {intensity}/10
                            </p>
                        </div>    
                    )}
                </div>
                
                <hr className="mb-3 mt-2"/> 

                {/* PRIX + QUANTITE */}
                <div className="flex w-full justify-between">
                    
                    <div className="w-1/2 flex items-center gap-x-2">
                        <p className="roboto-regular text-xl m-0">Prix :</p>
                        <p className="roboto-bold text-3xl m-0">{price}€</p>      
                    </div>

                    <div className="w-1/2 flex justify-end items-center gap-x-2">
                        <p className="roboto-regular text-xl m-0">Quantité :</p>
                        <input
                            type="number"
                            min="1"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)} // accepte "" ou un nombre
                            className="w-[80px] h-[40px] no-spin p-2 rounded-lg bg-white text-center roboto-regular text-black outline-none"
                        />
                    </div>          
                </div>
                
                <hr className="mb-3 mt-2"/>

                <button
                    onClick={handleValidate}
                    className="flex justify-center items-center rounded px-4 h-[40px] bg-green-500 roboto-bold text-white hover:bg-green-600 transition-all rounded-lg uppercase"
                >
                    <FaCheck size={16} className="mr-2"/>
                </button>

            </div>

        </div>
        </>
    )
}

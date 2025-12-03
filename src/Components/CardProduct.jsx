import { useState } from "react"
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Flag from "../Components/Flag";
import { FaCheck } from "react-icons/fa6";

export function CardProduct({ image, name, price, description, origin, intensity, AddToCart, isOpen, openInput, closeInput, showError }) {
    
    const [isFavorite, setIsFavorite] = useState(false)
    const [qty, setQty] = useState(null)

    const handleValidate = () => {
        if (!qty || qty <= 0) {
            showError("Valeur incorrecte");
            return;
        }
        AddToCart(qty);
        closeInput();
        setQty(null);
    };

    return(
        <div className="w-[320px] max-h-[500px] border">

            <img src={`http://localhost:8080/uploads/image/${image}`}  alt="img"
                className="w-full h-[320px] p-2 object-cover overflow-x-hidden"
            />

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

                    {/* FAVORIS */}
                    <button
                        className="w-[40px] h-[40px] rounded buttonFav"
                        onClick={()=>setIsFavorite(!isFavorite)}
                    >
                        {!isFavorite ? (
                            <img src="/Products/favIconEmpty.png" alt="favEmpty"
                                className="h-full w-auto object-contain"
                            />
                        ) : (
                            <img src="/Products/favIconFull.png" alt="favFull"
                                className="h-full w-auto object-contain"
                            />
                        )}
                    </button>


                    {/* --- ADD TO CART / INPUT + VALIDER --- */}
                    <div className="relative w-full h-full overflow-hidden">

                        {/* Bouton ADD TO CART (caché quand isOpen=true) */}
                        {!isOpen && (
                            <button 
                                onClick={openInput}
                                className="w-full h-full flex justify-end items-center rounded roboto-bold buttonAddCart text-right pr-2"
                            >
                                Add to cart
                                <MdOutlineArrowForwardIos/>
                            </button>
                        )}

                        {/* SLIDE INPUT */}
                        <div
                            className={`
                                absolute top-0 right-0 flex items-center justify-end w-full h-full
                                transition-transform duration-300
                                ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                            `}
                        >
                            <input
                                type="text"
                                value={qty === null ? "" : qty}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "") {
                                        setQty(null);
                                        return;
                                    }
                                    if (/^\d+$/.test(value)) {
                                        setQty(Number(value));
                                    }
                                }}
                                className="w-[100px] h-full p-1 rounded-s-lg bg-white text-center roboto-regular text-black outline-none"
                            />

                            <div
                                onClick={handleValidate}
                                className="flex justify-center items-center w-[50px] h-full bg-green-500 roboto-regular text-white hover:bg-green-600 transition-all rounded-r-lg"
                            >
                                <FaCheck size={20}/>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            
        </div>
    )
}

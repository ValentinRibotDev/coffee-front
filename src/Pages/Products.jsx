//React
import { useOutletContext } from "react-router-dom";
import React, { useState,useEffect } from "react";

//Component
import Flag from "../Components/Flag";
import { Navigation} from "../Components/NavBar"
import { BannerProduct } from "../Components/BannerProduct"
import { Footer } from "../Components/Footer";
import { Carousel } from "../Components/Carousel";
import { LiaSearchSolid } from "react-icons/lia";
import { CardProduct } from "../Components/CardProduct";

export default function Products() {

    /**
     * FETCH
     */
    const { produits } = useOutletContext();
    // Variable Get
    // produit.id (key)
    // produit.image
    // produit.name
    // produit.description
    // produit.intensity
    // produit.origin
    // produit.price

    const test = [
        {image:'' , name:"L'originel", description:'Les grains de café de nos début, les aromes et la qualité colombienne réuni', intensity:'6', origin:'Colombie', price:'8.99', catégorie:'Café'},
        {image:'' , name:"L'original", description:'Le visage moderne de nos grains de café, plus corsé, un gout intense en épice', intensity:'8', origin:'Colombie', price:'12.99', catégorie:'Café'},
        {image:'' , name:"L'unique", description:'Nos grain de café conçu pour nos café froid, des saveurs inconnu vous attende', intensity:'4', origin:'France', price:'19.99', catégorie:'Café'},
        {image:'' , name:'La vertu', description:'Notre matcha bio tous droit importé du Japon, pour des saveurs authentiques', intensity:'1', origin:'Japon', price:'15.99', catégorie:'Thé'},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'2.99', catégorie:''},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'6.99', catégorie:''},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'', catégorie:''},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'', catégorie:''},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'', catégorie:''},
    ]

    /**
     * USE STATE
     */
    const [rangeValue, setRangeValue] = useState(100)
    const [selectValue, setSelectValue] = useState('')
    const [inputValue, setInputValue] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    /**
     * FILTER
     */

    //InputValue change onClick or press Enter
    const handleSearch = () => {
        setSearchQuery(inputValue)
    }

    //Check all value with data 
    const filteredProduits = test.filter((produit) => {

        const price = parseFloat(produit.price) || 0;

        // Initialize -> load all
        if (searchQuery === "" && selectValue === "" && rangeValue >= 100) {
        return true;
        }

        // Price
        const isPriceOk = price >= 0 && price <= rangeValue;

        // Input
        const textToSearch = (produit.name + " " + produit.description).toLowerCase();
        const isTextOk =
        searchQuery === "" || textToSearch.includes(searchQuery.toLowerCase());

        // Select
        const isCategoryOk =
        selectValue === "" || produit.catégorie === selectValue;

        return isPriceOk && isTextOk && isCategoryOk;

    });

    return (
        <>
            <div className="flex flex-col bannerBackground">

                <div>
                    <Navigation color={'#fff'} className={'invert'} />
                </div>

                <div className="flex flex-col items-center">    
                    <div className="overflow-x-hidden flex justify-center select-none w-full">
                        <BannerProduct />
                    </div>

                    <div className="w-full h-56 sm:h-64 lg:h-80 max-w-[1440px] mb-4 bg-blue-300">
                        <Carousel />
                    </div>                    
  
                    <div className="w-full max-w-[1440px] flex flex-col md:flex-row mb-3">
                
                        <div className="w-[90%] ml-4 md:w-1/2 flex flex-col items-center sm:flex-row p-1 md:h-[50px] md:ml-5 rounded-lg  items-center gap-6">
                    
                            <select
                                defaultValue=""
                                className="w-full p-2 sm:w-1/2 rounded-lg border border-gray-300 bg-white text-gray-700"
                                value={selectValue}
                                onChange={(e) => setSelectValue(e.target.value)}
                                >

                                <option value="">Filtre par catégorie</option>
                                <option value="Café">Café</option>
                                <option value="Thé">Thé</option>
                                <option value="Latte">Latté</option>

                            </select>

                    
                            <div className="flex flex-col w-[90%] sm:w-1/2">
                                <label className="text-sm font-medium text-white">
                                    Prix maximum
                                </label>
                                <div className="relative w-full">

                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={0.01}
                                        value={rangeValue}
                                        onChange={(e) => setRangeValue(e.target.value)}
                                        className="w-full accent-white cursor-pointer"
                                    />

                                    <div
                                        className="absolute -top-10 transform -translate-x-1/2 bg-white text-black text-xs font-semibold px-2 py-1 rounded"
                                        style={{
                                            left: `${rangeValue}%`,
                                        }}
                                        >
                                        {rangeValue}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 p-4 h-[50px] rounded-lg flex items-center">

                            <div className="relative w-full">

                                <button 
                                    type="button"
                                    className="
                                        absolute right-3 top-1/2 -translate-y-1/2 
                                        flex justify-center items-center
                                        text-white 
                                        searchButton"
                                    onClick={handleSearch}
                                >
                                    <LiaSearchSolid className="h-5 w-5"/>    
                                </button>
                                
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="
                                        searchBar
                                        w-full pl-10 p-2 
                                        rounded-lg border border-gray-300 
                                        bg-white 
                                        text-gray-700 placeholder-gray-400 
                                        focus:outline-none"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                        handleSearch();
                                        }
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                    
                    {/* CARD CONTAINER */}
                    <div className="w-full max-w-[1440px] flex flex-wrap justify-center gap-3">

                        {/* CARD */}
                        {filteredProduits.map((produit, index) => (
                            <CardProduct
                                key={index}
                                image={produit.image}
                                name={produit.name}
                                price={produit.price}
                                description={produit.description}
                                origin={produit.origin}
                                intensity={produit.intensity}
                            />
                        ))}
                        
                    </div>
                    
                </div>

                <div className="hidden items-end col-span-12 h-14 p-1 pointer-events-auto md:flex md:justify-around">
                        <Footer className={'invert'}/>
                </div>
                           
            </div>
        </>
    )
}
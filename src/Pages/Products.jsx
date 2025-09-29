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

export default function Products() {

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
        {image:'' , name:"L'originel", description:'Les grains de café de nos début, les aromes et la qualité colombienne réuni', intensity:'6', origin:'Colombie', price:'8.99',},
        {image:'' , name:"L'original", description:'Le visage moderne de nos grains de café, plus corsé, un gout intense en épice', intensity:'8', origin:'Colombie', price:'12.99',},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'',},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'',},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'',},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'',},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'',},
        {image:'' , name:'', description:'', intensity:'', origin:'', price:'',},
    ]
    const [rangeValue, setRangeValue] = useState(50);
    const [selectValue, setSelectValue] = useState('')

    produits.map((produit)=>{
        if(produit.price > rangeValue){
            console.log('prix supérieur, ne pas afficher')
        } else {
            console.log('prix dans la marge, afficher')
        }

        if(selectValue === '') {
            console.log('fetch all produit')
        } else {
            console.log(`fetch where produit.categories=${selectValue}`)
        }
    })
    
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

                                <option value="">Filtre catégorie inactif</option>
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

                                <LiaSearchSolid className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="
                                    w-full pl-10 p-2 
                                    rounded-lg border border-gray-300 
                                    bg-white 
                                    text-gray-700 placeholder-gray-400 
                                    focus:outline-none"
                                />

                            </div>
                        </div>
                    </div>
                    
                    {/* CARD CONTAINER */}
                    <div className="w-full max-w-[1440px] flex flex-wrap justify-center xl:justify-between gap-3">

                        {/* CARD */}
                        {test.map((produit) => (
                            <div className="w-[320px] max-h-[500px] border">

                                <img src={produit.image} alt="img" className="w-full h-[320px] p-2"/>

                                <div className="w-full h-[180px] p-2 cardBackground text-black">

                                    <div className="flex justify-between items-center h-1/4">
                                        <p className="roboto-bold text-2xl m-0">{produit.name}</p>
                                        <p className="roboto-bold text-2xl m-0">{produit.price}€</p>  
                                    </div>
                                    

                                    <p className="roboto-regular test-xs h-1/4 ">{produit.description}</p>

                                    <div className="flex justify-between items-center h-1/4">
                                        <p className="roboto-regular m-0">Origine: {produit.origin}</p>
                                        <p className="roboto-regular m-0">Intensité: {produit.intensity}/10</p>    
                                    </div>

                                    <div className="flex justify-between items-center h-1/4">
                                        <button className="w-[100px] h-3/4 border-[2px] rounded">Favoris</button>
                                        <button className="w-[100px] h-3/4 border-[2px] rounded">Add to cart</button>                                   
                                    </div>

                                </div>
                                
                            </div>    
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
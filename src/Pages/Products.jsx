//React
import { useOutletContext } from "react-router-dom";
import React, { useState,useEffect } from "react";

//Component
import Flag from "../Components/Flag";
import { Navigation} from "../Components/NavBar"
import { BannerProduct } from "../Components/BannerProduct"
import { Footer } from "../Components/Footer";
import { Carousel } from "../Components/Carousel";

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

    return (
        <>
            <div className="flex flex-col min-h-screen bannerBackground">

                <div>
                    <Navigation color={'#fff'} className={'invert'} />
                </div>

                <div className="flex flex-col items-center">    
                    <div className="overflow-x-hidden flex justify-center select-none w-full">
                        <BannerProduct />
                    </div>

                    <div className="w-full h-56 sm:h-64 lg:h-80 max-w-[1440px] mb-5 bg-blue-300">
                        <Carousel />
                    </div>

                    <div className="w-full max-w-[1440px] md:flex mb-3">
                        <div className="md:w-1/2 bg-green-300">Filtre cat + prix</div>
                        <div className="md:w-1/2 bg-red-300">Filtre recherche</div>
                    </div>
                    <div className="w-full max-w-[1440px] bg-blue-300">Container Card</div>
                    
                </div>

                <div className="hidden items-end col-span-12 h-14 p-1 pointer-events-auto md:flex md:justify-around">
                        <Footer className={'invert'}/>
                </div>
                
                
                
                
            </div>
        </>
    )
}
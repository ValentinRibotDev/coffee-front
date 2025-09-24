import { Navigation} from "../Components/NavBar"
import { useOutletContext } from "react-router-dom";
import React, { useState,useEffect } from "react";
import Flag from "./Flag";

export default function Products() {

const { produit } = useOutletContext();
console.log("produit:", produit);

  return (
<>
  <Navigation/>
  <div className="flex gap-4 justify-center mt-20">
    {produit.map((product) => (
      <div key={product.id} className="w-sm h-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex justify-center">
        <img className="p-8 rounded-t-lg h-60 w-50" src={`http://localhost:8080/uploads/image/${product.image}`} alt={product.name} />
        </div>
      <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{product.name}</h5>
          <p className="text-sm/5">
            {product.description ? product.description.replace(/<[^>]+>/g, '') .replace(/&nbsp;/g, ' ') : ''} {/* suppression de toutes les balises HTML et de l'espace forcé*/} 
          </p>
          <div className="flex justify-between">
          <p>Intensité : {product.intensity ?? 0}</p> {/* nullish coalescing = si null ou undefined, affiche 0 */}
         <p>Origine :&nbsp;<Flag countryCode={product.origin} /></p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900">{product.price}€</span>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</a>
        </div>
      </div>
    </div>
    ))}
  </div>
</>
  )
}
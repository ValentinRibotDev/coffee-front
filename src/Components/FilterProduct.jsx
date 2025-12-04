import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { LiaSearchSolid } from "react-icons/lia";

export function FilterProduct({
    categories,
    selectedCategories,
    setSelectedCategories,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    inputValue,
    setInputValue
}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleCategory = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    return (
        <div className="w-full max-w-[250px] lg:max-w-[300px]  min-w-[250px] mb-4">

            {/* Bouton principal pour ouvrir/fermer tous les filtres */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border-b border-gray-300 bg-white p-3 rounded-t shadow-md flex justify-between items-center roboto-bold text-lg hover:bg-gray-50 transition"
            >
                Filtres
                {isOpen ? <FaArrowUp /> : <FaArrowDown />}
            </button>

            {/* Menu des filtres */}
            {isOpen && (
                <div className="bg-white rounded-b shadow-md p-3 flex flex-col gap-y-3">

                    {/* BARRE DE RECHERCHE */}
                    <div className="flex flex-col gap-2">
                        <h3 className="roboto-bold text-base">Recherche</h3>
                        <div className="relative">  
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                className="w-full pl-3 pr-3 p-2 rounded-lg border border-gray-300 text-sm outline-none focus:border-gray-400"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <LiaSearchSolid className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5"/>
                        </div>
                    </div>

                    <hr className="m-1"/> 

                    {/* FILTRE PRIX */}
                    <div className="flex flex-col">
                        <h3 className="roboto-bold text-base">Prix (€)</h3>

                        {/* Inputs Min/Max */}
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="text-xs text-gray-600 roboto-regular">Min</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                    className="w-full p-2 border rounded-lg text-sm outline-none focus:border-gray-400"
                                    placeholder="0"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-600 roboto-regular">Max</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full p-2 border rounded-lg text-sm outline-none focus:border-gray-400"
                                    placeholder="100"
                                />
                            </div>
                        </div>

                        {/* Barre de range */}
                        <div className="relative pt-2">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-gray-700 cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0€</span>
                                <span>100€</span>
                            </div>
                        </div>
                    </div>

                    <hr className="m-1"/>

                    {/* FILTRE CATÉGORIE */}
                    <div className="flex flex-col gap-2">
                        <h3 className="roboto-bold text-base">Catégories</h3>
                        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                            {categories.map((cat, index) => (
                                <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => toggleCategory(cat)}
                                        className="w-4 h-4 cursor-pointer"
                                    />
                                    <span className="roboto-regular text-sm">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

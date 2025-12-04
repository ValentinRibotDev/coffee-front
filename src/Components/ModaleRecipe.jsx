import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useOutletContext } from "react-router-dom";

export default function ModaleRecipe({ i, className = '', style = {}, drinkColor, Name, onClose, parentOpen }) {
    const { recettes } = useOutletContext();
    const [localOpen, setLocalOpen] = useState(false);
    const modalId = `modal-${i}`;

    const isOpen = parentOpen !== undefined ? parentOpen : localOpen;
    const currentRecettes = recettes?.[i];

    const handleClose = () => {
        if (onClose) onClose();
        else setLocalOpen(false);
    };

    const etapes = useMemo(() => {
        const arr = [];
        for (let j = 0; j <= 9; j++) {
        const key = j === 0 ? "etape" : `etape${j}`;
        const value = currentRecettes?.[key];
        if (value && value !== "null") arr.push(value);
        }
        return arr.length > 0 ? arr : ["Aucune étape disponible"];
    }, [currentRecettes]);

    const [index, setIndex] = useState(0);

    const nextStep = () => setIndex(prev => (prev + 1) % etapes.length);
    const prevStep = () => setIndex(prev => (prev - 1 + etapes.length) % etapes.length);

    return (
        <>
            {parentOpen === undefined && (
                <button
                    onClick={() => setLocalOpen(true)}
                    className={`recipeButton roboto-regular w-full h-full text-black hover:!text-white`}
                    style={style}
                    type="button"
                >
                    See more
                </button>
            )}

            {isOpen && createPortal(
                <div id={modalId} className="overflow-y-auto overflow-x-hidden fixed z-50 w-full h-full inset-0 h-[calc(100%-1rem)] flex justify-center items-center bg-black/50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div
                            className="relative bg-stone-200 rounded-lg shadow-sm border-4"
                            style={{ borderColor: drinkColor }}
                        >

                            {/* HEADER */}
                            <div className="flex items-center justify-between pl-4 pr-4 pt-4">

                                <p
                                    className="text-2xl roboto-bold uppercase text-shadow-sm m-0 md:text-5xl"
                                    style={{ color: drinkColor }}
                                >
                                    {Name}
                                </p>

                                <button
                                    onClick={handleClose}
                                    type="button"
                                    className="
                                        text-stone-900 hover:text-red-500
                                        w-8 h-8 ms-auto inline-flex justify-center items-center
                                        hover:border hover:border-red-500 hover:scale-140
                                        transition-transform
                                    "
                                    data-modal-hide={modalId}
                                >

                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">

                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>

                                    </svg>

                                    <span className="sr-only">Close modal</span>

                                </button>

                            </div>

                            {/* CONTENT */}
                            {currentRecettes && (
                                <div className="pl-2 pr-2 mt-2 space-y-4">

                                    {/* INFO */}
                                    <div className="p-2 rounded-lg text-white" style={{ background: drinkColor }}>

                                        <p className="roboto-regular text-xl md:text-2xl">Informations :</p>

                                        <p className="roboto-regular text-sm md:text-md leading-relaxed">
                                        {currentRecettes.info
                                            .replace(/<[^>]+>/g, '')
                                            .replace(/&nbsp;/g, ' ')
                                        }
                                        </p>

                                    </div>

                                    {/* ETAPES + CARROUSEL */}
                                    <div className="p-2 mb-2 rounded-lg border-2" style={{ color: drinkColor }}>
                                        <p className="roboto-regular text-xl md:text-2xl">Étapes {index+1} :</p>

                                        <p className="text-sm md:text-md leading-relaxed text-gray-700">
                                            {etapes[index]}
                                        </p>

                                        <div className="flex w-full justify-between items-center gap-3 mt-3 text-white">
                                            <button
                                                onClick={prevStep}
                                                className="w-3/10 px-3 py-1 flex justify-center items-center rounded roboto-bold !text-[14px] md:!text-base hover:tracking-widest transition-all"
                                                style={{ backgroundColor: drinkColor }}
                                            >
                                                PRECEDENT
                                            </button>

                                            <p className="w-4/10 flex justify-center items-center text-sm text-stone-900 m-0">
                                                {index + 1} / {etapes.length}
                                            </p>

                                            <button
                                                onClick={nextStep}
                                                className="w-3/10 px-3 py-1 flex justify-center items-center rounded roboto-bold !text-[14px] md:!text-base hover:tracking-widest transition-all"
                                                style={{ backgroundColor: drinkColor }}
                                            >
                                                SUIVANT
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

import { useEffect,useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ModaleRecipe({ i, className = "", style = {}, Name }) {
  const { recette } = useOutletContext();
  const modalId = `modal-${i}`;
  const [open, setOpen] = useState(false);
  // On récupère la recette correspondant à l'index de la boisson
  const currentRecette = recette?.[i] || null;
  
  return (
<>
    <button onClick={() => setOpen(true)}  className={` w-[120px] h-3/5 rounded roboto-regular ${className}`} style={style} type="button">
    See more
    </button>

    {open && (
    <div id={modalId} className="overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center bg-black/50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {Name}
                    </h3>
                    <button onClick={() => setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                { currentRecette && (
                <div className="p-4 md:p-5 space-y-4">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {currentRecette.info}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {currentRecette.etape}
                    </p>
                </div>
                )}
            </div>
        </div>
    </div>
    )}
</>
  )
}
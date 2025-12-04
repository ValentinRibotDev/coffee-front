import { useState, useEffect } from "react"
import Flag from "../Components/Flag";

//Icons
import { FaCheck } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { MdLocalFireDepartment } from "react-icons/md";

export function CardProduct({ image, name, price, description, origin, intensity, AddToCart, showError }) {

    const [isFavorite, setIsFavorite] = useState(false);
    const [qty, setQty] = useState("1");
    const [breakpoint, setBreakpoint] = useState('sm');

    // Détection des breakpoints
    useEffect(() => {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            if (width >= 1280) setBreakpoint('xl');
            else if (width >= 1024) setBreakpoint('lg');
            else if (width >= 768) setBreakpoint('md');
            else setBreakpoint('sm');
        };

        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);

        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);

    const handleValidate = () => {
        const quantity = parseInt(qty);
        if (!quantity || quantity <= 0) {
            showError("Valeur incorrecte");
            return;
        }
        AddToCart(quantity);
        setQty("1");
    };

    // Fonction pour tronquer le texte avec ellipsis
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + "...";
    };

    // Longueurs adaptatives selon le breakpoint
    const getNameLengthLimit = () => {
        if (breakpoint === 'xl') return 40;
        if (breakpoint === 'lg') return 22;
        return 11; // sm et md
    };

    const getDescriptionLengthLimit = () => {
        if (breakpoint === 'xl') return 200;
        if (breakpoint === 'lg') return 61;
        return 0; // pas de description en sm/md
    };

    const nameLengthLimit = getNameLengthLimit();
    const descriptionLengthLimit = getDescriptionLengthLimit();

    return (
        <>
            {/* VERSION MOBILE/TABLETTE (< lg) */}
            <div className="flex flex-col min-w-[200px] max-w-[200px] lg:hidden shadow-md rounded-lg overflow-hidden text-white" style={{background: '#4c5355'}}>

                {/* Image */}
                <div className="w-[200px] h-[200px] overflow-hidden p-1 bg-white">
                    <img
                        src={`http://localhost:8080/uploads/image/${image}`}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Contenu */}
                <div className="p-3 flex flex-col gap-2">

                    {/* Nom + Favoris */}
                    <div className="flex justify-between items-center">
                        <p className="roboto-bold text-xl uppercase m-0 flex-1" title={name}>
                            {truncateText(name, nameLengthLimit)}
                        </p>
                        <button
                            className="w-[35px] h-[35px]"
                            onClick={() => setIsFavorite(!isFavorite)}
                        >
                            {!isFavorite ? (
                                <img
                                    src="/Products/favIconEmpty.png"
                                    alt="favEmpty"
                                    className="h-full w-auto object-contain buttonFav invert"
                                />
                            ) : (
                                <img
                                    src="/Products/favIconFull.png"
                                    alt="favFull"
                                    className="h-full w-auto object-contain buttonFav"
                                />
                            )}
                        </button>
                    </div>

                    {/* Origine + Intensité */}
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                            <Flag countryCode={origin} />
                        </div>

                        {/* Prix */}
                        <div className="flex items-center gap-1 text-lg font-bold">
                            <span>{price}€</span>
                        </div>
                    </div>

                    {/* Quantité + Bouton */}
                    <div className="flex justify-between items-center gap-2">

                        <input
                            type="number"
                            min="1"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="w-[50px] p-2 border rounded-lg text-center outline-none focus:border-gray-400 no-spin"
                        />

                        <button
                            onClick={handleValidate}
                            className="flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded bg-green-500 text-white roboto-bold rounded-lg hover:bg-green-600 transition"
                        >
                            <FaCheck size={14} />
                            Ajouter
                        </button>
                    </div>

                </div>

            </div>

            {/* VERSION DESKTOP (≥ lg) */}
            <div
                className="hidden lg:flex lg:min-w-[750px] xl:max-w-[1150px] max-h-[300px] shadow-md rounded-lg overflow-hidden"
                style={{ background: '#4c5355' }}
            >

                {/* Image */}
                <div className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] p-1 bg-white">
                    <img
                        src={`http://localhost:8080/uploads/image/${image}`}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Contenu */}
                <div className="w-full p-3 text-white flex flex-col">

                    {/* Nom + Favoris */}
                    <div className="flex justify-between items-center mb-2">
                        <p className="roboto-bold uppercase text-3xl m-0" title={name}>
                            {truncateText(name, nameLengthLimit)}
                        </p>
                        <button
                            className="w-[40px] h-[40px]"
                            onClick={() => setIsFavorite(!isFavorite)}
                        >
                            {!isFavorite ? (
                                <img
                                    src="/Products/favIconEmpty.png"
                                    alt="favEmpty"
                                    className="h-full w-auto object-contain invert buttonFav"
                                />
                            ) : (
                                <img
                                    src="/Products/favIconFull.png"
                                    alt="favFull"
                                    className="h-full w-auto object-contain buttonFav"
                                />
                            )}
                        </button>
                    </div>

                    {/* Description */}
                    <div className="mb-2">
                        <p className="roboto-regular text-xl m-0 mb-1">Description :</p>
                        <p className="roboto-regular text-base m-0" title={description}>
                            {truncateText(description, descriptionLengthLimit)}
                        </p>
                    </div>

                    <hr className="my-1" />

                    {/* Origine + Intensité */}
                    <div className="flex justify-between my-1">
                        <div className="flex items-center gap-2">
                            <BiWorld className="text-2xl" />
                            <span className="roboto-regular text-lg">Origine :</span>
                            <Flag countryCode={origin} />
                        </div>
                        {intensity !== undefined && (
                            <div className="flex items-center gap-2">
                                <MdLocalFireDepartment className="text-2xl text-orange-400" />
                                <span className="roboto-regular text-lg">Intensité :</span>
                                <span className="roboto-regular text-lg">{intensity}/10</span>
                            </div>
                        )}
                    </div>

                    <hr className="my-1" />

                    {/* Prix + Quantité */}
                    <div className="flex justify-between items-center my-1">
                        <div className="flex items-center gap-2">
                            <RiMoneyEuroCircleLine className="text-3xl" />
                            <span className="roboto-regular text-xl">Prix :</span>
                            <span className="roboto-bold text-3xl">{price}€</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="roboto-regular text-xl">Quantité :</span>
                            <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                className="w-[80px] h-[40px] p-2 rounded-lg bg-white text-center roboto-regular text-black no-spin outline-none"
                            />
                        </div>
                    </div>

                    <hr className="my-1" />

                    {/* Bouton Valider */}
                    <button
                        onClick={handleValidate}
                        className="flex justify-center items-center rounded mt-2 gap-2 px-4 h-[40px] cardBackground roboto-bold text-stone-600 hover:scale-102 active:scale-97 transition-all !uppercase"
                    >
                        <FaCheck size={16} />
                        Ajouter au panier
                    </button>

                </div>

            </div>
        </>
    );
}

//Components
import { Navigation } from "../Components/NavBar"
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export function Overlay({ active, setActive, max }) {

    //HandleActive
    const handlePrev = () => setActive((prev) => (prev - 1 + max) % max)
    const handleNext = () => setActive((prev) => (prev + 1) % max)

    // Fetch products
    // const fetchProducts = async () => {
    // try {
    //     const res = await fetch("http://localhost:8080/api/products", {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     });

    //     if (!res.ok) {
    //     throw new Error(`Erreur serveur: ${res.status}`);
    //     }

    //     const data = await res.json();
    //     console.log("Données reçues :", data);

    //     // Exemple : setProducts(data);
    // } catch (err) {
    //     console.error("Erreur lors de la récupération :", err);
    // }
    // };

    // fetchProducts()

    //Array
    const htmlDisplay = [
        { 
        name: "Envou'temps",
        color: '#d17d2e', 
        description: 'Un café onctueux et délicatement doux, sublimé par de savoureuses notes de caramel. L’allié parfait pour couronner une matinée bien remplie et s’offrir un instant de plaisir irrésistible.'
        },
        {
        name: "Temps'ête", 
        color: '#5da3c4', 
        description: 'Un café standard revisité en version glacée : la boisson idéale pour se rafraîchir quand la chaleur monte, tout en savourant son café préféré sous une nouvelle fraîcheur.',
        awards:''
        },
        { 
        name: "Temps'tation", 
        color: '#c50000', 
        description: 'Succombez à la tentation : un café corsé aux notes fruitées de cerise, où l’intensité du café rencontre la douceur sucrée pour un plaisir à la fois raffiné et frénétique.'
        },
        { 
        name: "Réconfor'Temps", 
        color: '#a88256', 
        description: 'Un café au lait onctueux et velouté, qui enveloppe chaque gorgée d’une douceur réconfortante. Idéal si l’amertume du café pur ne vous séduit pas, il saura vous charmer par sa tendresse et son équilibre'
        },
        { 
        name: "Transpor'Temps", 
        color: '#788f26', 
        description: 'Inspirée du Japon, cette boisson à base de matcha — un thé vert finement moulu — réinventé avec une touche de lait à l’occidentale. Une alliance unique qui offre un voyage de saveurs inédit et raffiné.'
        },
        { 
        name: "Ina'Temps'du", 
        color: '#f172b2', 
        description: 'Un café inédit, sublimé par le biscuit rose de Reims, emblème gourmand de la ville. Une création délicate aux saveurs exceptionnelles, qui promet une expérience unique.'
        },
        { 
        name: "Palpi'Temps", 
        color: '#101010', 
        description: 'Le classique des classiques, un café simple mais éfficace !'
        },
    ]

    const awards = htmlDisplay[active].award || null;

    return (
        <>
            <div className="
                absolute top-0 left-1/2 -translate-x-1/2
                max-w-[1920px] w-full h-screen
                grid grid-rows-16 grid-cols-12
                pointer-events-none"
                >

                {/* Navbar */}
                <div className="col-span-12 pointer-events-auto">
                    <Navigation color={htmlDisplay[active].color}/>
                </div>


                {/* Margin Top */}
                <div className="
                    col-span-12 row-span-12
                    sm:row-span-11
                    xl:row-span-1"
                    >
                </div>

                {/* Section Main */}
                <div className="
                    hidden col-span-4 row-span-12
                    xl:block
                    bg-green-300"
                    >
                    Slogan
                </div>

                <div className="
                    hidden col-span-4 row-span-12
                    xl:block"
                    >
                </div>

                <div className="
                    grid grid-cols-4 col-span-12 row-span-3 ml-3
                    sm:row-span-4
                    xl:col-span-4 xl:col-start-9 xl:row-span-6 xl:row-start-6
                    flex"        
                    >

                    {/* Previous Next Button */}
                    <div className="
                        col-span-4 pointer-events-auto
                        flex justify-center justify-evenly items-center gap-4
                        sm:col-span-2 sm:order-2 sm:justify-end sm:mr-6
                        lg:col-span-2 lg:order-6"
                        >

                        <button className="
                            w-8 h-8 rounded-full
                            bg-transparent border-2 border-white
                            flex items-center justify-center
                            text-white"
                            onClick={handlePrev}
                            >
                            <GrFormPrevious size={32}  />
                        </button>

                        <button className="
                            w-8 h-8 rounded-full
                            bg-transparent border-2 border-white
                            flex items-center justify-center 
                            text-white"
                            onClick={handleNext}
                            >
                            <GrFormNext size={32}/>
                        </button>

                    </div>

                    {/* Drink Name */}
                    <div className="
                        col-span-4 h-auto
                        flex justify-center 
                        sm:col-span-2 sm:order-1 sm:justify-start
                        lg:col-span-3 
                        roboto-bold uppercase text-[3rem] m-0 p-0"
                        >
                        {htmlDisplay[active].name}
                    </div>


                    <div className="
                        hidden 
                        lg:block lg:order-2"
                        >
                        <img src={awards} />
                    </div>

                    {/* Drink Description */}
                    <div className="
                        hidden col-span-4 order-4
                        roboto-regular
                        sm:block
                        lg:order-3"
                        >
                        {htmlDisplay[active].description}
                    </div>

                    {/* Nav Button products/recipe */}
                    <div className="
                        col-span-4 order-5 gap-4 pointer-events-auto
                        flex justify-center items-center
                        lg:col-span-2 lg:order-4 lg:justify-start"
                        >

                        <div className="
                            w-[120px] h-[30px]
                            sm:h-[40px]
                            border
                            rounded-lg
                            flex justify-center items-center
                            text-white uppercase font-bold text-xs
                            cursor-pointer"
                            style={{background:htmlDisplay[active].color}}
                            >
                            Add Product
                        </div>

                        <div className="
                            w-[120px] h-[30px]
                            sm:h-[40px]
                            border
                            rounded-lg bg-stone-600
                            flex justify-center items-center
                            text-white uppercase font-bold text-xs
                            cursor-pointer
                            duration-500 ease-in-out
                            hover:bg-stone-300"
                            >
                            See Recipe
                        </div>

                    </div>


                </div>

                {/* Margin Bottom */}
                <div className="
                    hidden col-span-12
                    xl:block"
                    >
                </div>

                {/* Footer */}
                <div className="col-span-12 pointer-events-auto bg-red-300">footer</div>    
            </div>
        </>
    )
}

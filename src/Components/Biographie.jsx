export function Biographie () {
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-3 mb-4 ">
                
                {/* Texte */}
                <div className="w-full lg:w-3/5">

                    <h1 className="roboto-bold uppercase m-0">
                        Le commencement
                    </h1>

                    <p className="roboto-regular">
                        Tout a commencé il y a plus de trente ans, en Colombie.<br/>
                        <br/>
                        Deux jeunes passionnés de voyages et de café se rencontrent par hasard, 
                        au détour d’une plantation nichée dans les montagnes andines.<br/>
                        <br/> 
                        De cette rencontre simple est née une idée qui paraissait alors folle : 
                        et si nous pouvions partager avec le monde entier l’authenticité et 
                        la richesse du café colombien ?<br/>
                        <br/>
                        Avec presque rien en poche, mais une passion commune immense, 
                        nous avons décidé de tenter l’aventure.<br/>
                        <br/>
                        Très vite, nous avons compris que notre force résidait dans la confiance 
                        et le respect que nous accordions aux cultivateurs locaux. <br/>
                        <br/>
                        Leur savoir-faire transmis de génération en génération, leur patience et leur exigence,
                        sont devenus les fondations de <strong>Coffee Time</strong>.<br/>
                        <br/>
                        C’est auprès d’eux que nous avons appris que derrière chaque tasse se cache une histoire, 
                        une tradition et une culture.
                    </p>

                </div>

                <div className="md:flex lg:w-2/5 max-h-[525px] overflow-hidden">

                    <div className="w-full h-[20px] aboutSeparator md:hidden"></div>
                    
                    <img 
                        src="/IMG/testHorizontal.jpg" 
                        alt="salut" 
                        className="hidden md:block lg:hidden w-full object-cover"
                    />

                    <img 
                        src="/IMG/testVertical.jpg" 
                        alt="salut" 
                        className="hidden lg:block object-cover"
                    />

                </div>

            </div>

            <div className="flex flex-col-reverse justify-end lg:flex-row gap-3 mb-4 ">

                <div className="md:flex lg:w-2/5 max-h-[525px] overflow-hidden ">

                    <div className=" w-full h-[20px] aboutSeparator md:hidden"></div>

                    <img 
                        src="/IMG/testHorizontal.jpg" 
                        alt="salut" 
                        className="hidden md:block lg:hidden w-full object-cover"
                    />

                    <img 
                        src="/IMG/testVertical.jpg" 
                        alt="salut" 
                        className="hidden lg:block object-cover"
                    />

                </div>

                {/* Texte */}
                <div className="w-full lg:w-3/5 lg:text-right  ">
                    
                    <h1 className="roboto-bold uppercase m-0">
                        Notre parcours
                    </h1>

                    <p className="roboto-regular">
                        Nos débuts ont été modestes : <br/> 
                        quelques sacs de grains, beaucoup de nuits blanches,
                        et l’énergie d’une idée plus grande que nous.<br/>
                        <br/>
                        Puis un ami, convaincu par notre projet, nous a proposé de fusionner avec 
                        son entreprise de transport.<br/> 
                        <br/>
                        Cette alliance a marqué un tournant : <br/>
                        elle nous a permis de réduire les coûts, d’accélérer la livraison <br/>
                        et de rendre notre café plus <strong>accessible</strong> à tous, sans jamais compromettre la qualité.<br/>
                        <br/>                            
                        Au fil des années, <strong>Coffee Time</strong> s’est forgé une identité unique :<br/> 
                        une recherche permanente de <strong>modernité</strong>, <strong>d’innovations</strong> et de nouvelles saveurs,<br/> 
                        tout en préservant la <strong>sobriété</strong> et l’<strong>équilibre</strong> qui font du café une boisson universelle,<br/> 
                        aimée du plus grand nombre.<br/> 
                        <br/>
                        Nous avons toujours voulu que notre café soit à la fois <strong>raffiné</strong> et <strong>abordable</strong>,<br/>
                        capable de plaire aussi bien aux connaisseurs qu’à ceux qui cherchent simplement<br/> 
                        un moment de réconfort.
                    </p>

                </div>          

            </div>

            <div className="flex flex-col lg:flex-row gap-3 mb-4 ">
                
                {/* Texte */}
                <div className="w-full lg:w-3/5">

                    <h1 className="roboto-bold uppercase m-0">
                        Et maintenant ?
                    </h1>

                    <p className="roboto-regular">
                        Aujourd’hui, trois décennies plus tard, 
                        l’aventure qui a commencé autour d’un rêve partagé est devenue une réalité 
                        bien plus grande que ce que nous pouvions imaginer.<br/> 
                        <br/>
                        <strong>Coffee Time</strong> est désormais un acteur majeur du marché mondial du café.<br/> 

                        Et pourtant, malgré cette croissance, nous restons fidèles à nos origines :<br/>
                        <br/> 
                        Chaque grain que nous sélectionnons, chaque mélange que nous créons, 
                        est toujours guidé par la même passion qui nous animait lors de notre 
                        première rencontre en Colombie.<br/>
                        <br/>
                        <strong>Coffee Time</strong>, c’est avant tout une histoire humaine :<br/> 
                        deux amis, une idée folle, et l’envie de faire voyager le monde à travers
                        une simple tasse de café.
                    </p>

                </div>

                <div className="md:flex lg:w-2/5 max-h-[525px] overflow-hidden">

                    <div className="w-full h-[20px] aboutSeparator md:hidden"></div>

                    <img 
                        src="/IMG/testHorizontal.jpg" 
                        alt="salut" 
                        className="hidden md:block lg:hidden w-full object-cover"
                    />

                    <img 
                        src="/IMG/testVertical.jpg" 
                        alt="salut" 
                        className="hidden lg:block object-cover"
                    />

                </div>

            </div>

        </>
    )
}
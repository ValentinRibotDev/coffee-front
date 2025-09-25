import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";


export function Footer ({className}) {
    return (
        <>
            <div className={`${className} w-1/3 flex-col items-center lg:flex flex-row`}>

                <p className="h-6 mr-3 mb-0 roboto-bold">Valentin Ribot</p>

                <div className="flex w-[70px] justify-between items-center h-6">
                    <a href="https://myportfolio-five-umber-42.vercel.app/" target="_blank" className="text-black !no-underline"><IoEarth/></a>
                    <a href="https://www.linkedin.com/in/valentin-ribot-66b433119/" target="_blank" className="text-black !no-underline"><FaLinkedin/></a>
                    <a href="https://github.com/ValentinRibotDev?tab=repositories" target="_blank" className="text-black !no-underline"><FaGithub/></a>
                </div>

            </div>

            <p className={`${className} w-1/3 flex items-end justify-center h-full roboto-regular`}>
                @All right reserved
            </p>

            <div className={`${className} w-1/3 flex flex-col items-end lg:items-center lg:flex-row-reverse`}>

                <div className="flex w-[70px] justify-between items-center h-6 order-2">
                    <a href="https://github.com/Roms10000" target="_blank" className="text-black !no-underline"><FaGithub/></a>
                    <a href="https://www.linkedin.com/in/romain-richardon-4b8083245/" target="_blank" className="text-black !no-underline"><FaLinkedin/></a>
                    <a href="https://romain-richardon.vercel.app/" target="_blank" className="text-black !no-underline"><IoEarth/></a>
                </div>

                <p className="h-6 ml-3 mb-0 text-right order-1 roboto-bold">Romain Richardon</p>

            </div>
        </>
    )
}
import { Footer } from "../Components/Footer";
import { InfoProfil } from "../Components/infoProfil";
import { Navigation } from "../Components/NavBar";

export function Profil() {

    return (
        <>
            <div className="flex flex-col bannerBackground">
                <div>
                    <Navigation color='#fff' className={'invert'}/>
                </div>
                <div>
                    <InfoProfil/>
                </div>
                        
            </div>
            
        </>
    )
}
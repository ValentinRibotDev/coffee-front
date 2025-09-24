import { Navigation } from "../Components/NavBar"
import { BannerAbout } from "../Components/BannerAbout"
import { Biographie } from "../Components/Biographie"

export function About() {
    return (
        <>
            <div className="flex flex-col bannerBackground">
                <div className="">
                    <Navigation color={'#fff'} className={'invert'}/>
                </div>

                <div className="flex flex-col items-center">
                    <div className="overflow-x-hidden flex justify-center select-none w-full">
                        <BannerAbout/>
                    </div>
                    <div className="text-white p-2 max-w-[1440px]">
                        <Biographie/>
                    </div>
                </div>
                <div className="bg-green-300">footer</div>
            </div>
        </>
    )
}
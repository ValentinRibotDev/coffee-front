import { Navigation } from "../Components/NavBar"

export function About() {
    return (
        <>
            <div className="grid grid-rows-3 bannerBackground">
                <div className="">
                    <Navigation color={'#fff'} className={'invert'}/>
                </div>
                <div className="bg-blue-300">1</div>
                <div className="bg-green-300">2</div>
            </div>
        </>
    )
}
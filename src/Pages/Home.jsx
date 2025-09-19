// CSS
import '../Css/home.css' 

// R3F
import { Canvas } from "@react-three/fiber"
import { useState } from "react"

//Components
import { Scene3D } from "./Scene3D.jsx"
import { Overlay } from "./Overlay"

/**
 * MAIN
 */
export function Home() {

    const [active, setActive] = useState(0)
    const max = 7

    return (
        <> 
            <Canvas
                shadows
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [0,0.2,10],
                } }
            >
                <color attach="background" args={['#c5c5c5']} />
                <Scene3D active={active}/>
            </Canvas>
            <Overlay active={active} setActive={setActive} max={max} />
        </>
    )
}
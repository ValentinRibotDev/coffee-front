// CSS
import '../Css/home.css' 

// R3F
import { Canvas } from "@react-three/fiber"

//Components
import { Scene3D } from "../Components/Home/Scene3D.jsx"
import { Overlay } from "../Components/Home/Overlay.jsx"

/**
 * MAIN
 */
export function Home() {
  return (
    <> 
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200
            } }
        >
            <color attach="background" args={['white']} />
            <Scene3D/>
        </Canvas>
        <Overlay/>
    </>
  )
}
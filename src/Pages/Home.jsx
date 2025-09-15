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
      <Canvas>
        <Scene3D/>
      </Canvas>
      <Overlay/>
    </>
  )
}
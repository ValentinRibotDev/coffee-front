// CSS
import '../Css/home.css' 

// R3F
import { Canvas } from "@react-three/fiber"

//Components
import { Scene3D } from "./Scene3D.jsx"

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
                far: 200,
                position: [0,0.2,10],
            } }
        >
            <color attach="background" args={['white']} />
            <Scene3D/>
        </Canvas>
    </>
  )
}
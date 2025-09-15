//Debug UI
import { useControls } from "leva"

//Perf
import { Perf } from "r3f-perf"

export function Scene3D () {

    //Debug UI setup
    const { perfVisible } = useControls({
        perfVisible: false
    })

    return (
        <>    
            {/* Performance monitoring */}
            { perfVisible && <Perf position="top-left" />}

            {/* Meshes */}
            <mesh>
                <torusKnotGeometry/>
                <meshNormalMaterial/>
            </mesh>
        </>
    )
}
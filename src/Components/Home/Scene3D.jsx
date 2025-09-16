//Debug UI
import { Stage, OrbitControls, Float} from "@react-three/drei"
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
            
            {/* Controls */}
            <OrbitControls
                target={[0, 0, 0]} 
                minPolarAngle={Math.PI * 0.4}
                maxPolarAngle={Math.PI * 0.5}
                enableDamping={true}
                enableZoom={false}
                enablePan={false}
                autoRotate={true}
                autoRotateSpeed={1}
                makeDefault
            />

            {/* Ligthning */}

            <Stage
                intensity={0.2}
                preset={"soft"}
                shadows={{type:'accumulative', color:'white', colorBlend:15, opacity:1}}
                adjustCamera={2}
                environment={{files:"./HDRI/studio.hdr"}}
            >

                {/* Meshes */}

                <mesh 
                    position={[0, -0.8, 0]}
                    castShadow
                >
                    <sphereGeometry/>
                    <meshStandardMaterial color={'#ffffff'} roughness={0} metalness={1}/>
                </mesh>

                <mesh 
                    position={[2, -0.8, 0]}
                    castShadow
                >
                    <sphereGeometry/>
                    <meshStandardMaterial color={'#ffffff'} roughness={0.5} metalness={0.5}/>
                </mesh>

                <mesh 
                    position={[-2, -0.8, 0]}
                    castShadow
                >
                    <sphereGeometry/>
                    <meshStandardMaterial color={'#ffffff'} roughness={1} metalness={0}/>
                </mesh>
                
            </Stage>
        </>
    )
}
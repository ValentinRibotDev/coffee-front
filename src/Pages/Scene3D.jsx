//R3F+Drei
import { OrbitControls, Environment, Center, AccumulativeShadows, RandomizedLight, MeshReflectorMaterial} from "@react-three/drei"
import { useState, Suspense, startTransition } from "react"

//Debug UI
import { useControls } from "leva"

//Perf
import { Perf } from "r3f-perf"

//Components
import { CoffeeCup } from "../Components/CoffeeCup"

export function Scene3D () {

    //Debug UI setup
    const { perfVisible } = useControls('performance',{
        perfVisible: false
    })

    const {enableZoom, enablePan, autoRotate, autoRotateSpeed} = useControls('camera', {
        enableZoom: false,
        enablePan: false,
        autoRotate: false,
        autoRotateSpeed: {value:1, min:0, max:2, step:0.01}
    })

    const [preset, setPreset] = useState('sunset')
    const { blur } = useControls('environment',{
        blur: { value: 0.65, min: 0, max: 1 },
        preset: {
            value: 'sunset',
            options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
            onChange: (value) => startTransition(() => setPreset(value))
        }
    })
    
    const {metalness, roughness} = useControls('objects', {
        metalness: {value: 1, min: 0, max: 1},
        roughness: {value: 0, min:0, max: 1}
    })

    const {floorColor, floorMetalness, floorRoughness} = useControls('objects', {
        floorMetalness: {value: 1, min: 0, max: 1},
        floorRoughness: {value: 0, min:0, max: 1},
        floorColor: 'grey'
    })

    return (
        <>    
            {/* Performance monitoring */}
            { perfVisible && <Perf position="top-left" />}
            
            {/* Controls */}
            <OrbitControls
                target={[0, 2, 0]} 
                minPolarAngle={Math.PI * 0.35}
                maxPolarAngle={Math.PI * 0.49}
                enableDamping={true}
                enableZoom={enableZoom}
                enablePan={enablePan}
                autoRotate={autoRotate}
                autoRotateSpeed={autoRotateSpeed}
                makeDefault
            />

            {/* Ligthning */}
            <Environment preset={preset} background blur={blur}/>

            {/* Meshes */}

                <Center top>
                    <CoffeeCup scale={0.2}/>
                </Center>


            <mesh rotation-x={-Math.PI*0.5} scale={[100,20,20]} position={[0, -0.0005, 0]} receiveShadow>
                <planeGeometry/>
                <MeshReflectorMaterial color={floorColor} metalness={floorMetalness} roughness={floorRoughness} resolution={2048} blur={[10,10]}/>
            </mesh>

            {/* Shadows */}
            <AccumulativeShadows temporal frames={200} colorBlend={1} opacity={1} scale={30} alphaTest={0.85} resolution={1024}>
                <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
            </AccumulativeShadows>
        </>
    )
}
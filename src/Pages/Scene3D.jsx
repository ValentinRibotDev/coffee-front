//R3F+Drei
import { OrbitControls, Environment, Center, AccumulativeShadows, RandomizedLight, MeshReflectorMaterial, Lightformer} from "@react-three/drei"
import { useState, startTransition } from "react"

//Debug UI
import { useControls } from "leva"

//Perf
import { Perf } from "r3f-perf"

//Components
import { CoffeeCup } from "../Components/CoffeeCup"


//Main
export function Scene3D ({ active }) {

    //Debug UI setup
    const { perfVisible } = useControls('performance',{
        perfVisible: false
    })

    const [preset, setPreset] = useState('sunset')
    const {} = useControls('environment',{
        preset: {
            value: 'warehouse',
            options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
            onChange: (value) => startTransition(() => setPreset(value))
        }
    })

    //Array
    const envLight = [
        {name:'caramel', colorHot:'#ffc900', colorCold:'#06709d', hotIntensity:20.0, coldIntensity:15.0}, 
        {name:'glace', colorHot:'#00e2ff', colorCold:'#000993', hotIntensity:20.0, coldIntensity:10.0}, 
        {name:'cerise', colorHot:'#c50000', colorCold:'#096901', hotIntensity:30.0, coldIntensity:5.0},
        {name:'latte', colorHot:'#fffca1', colorCold:'#ab3300', hotIntensity:17.0, coldIntensity:9.5},
        {name:'matcha', colorHot:'#46ff00', colorCold:'#7c9302', hotIntensity:4.0, coldIntensity:7.0},
        {name:'rose', colorHot:'#f200ff', colorCold:'#3a0194', hotIntensity:20.0, coldIntensity:10.0}, 
        {name:'classic', colorHot:'#ffffff', colorCold:'#adadad', hotIntensity:20.0, coldIntensity:5.0},
    ]

    return (
        <>    
            {/* Performance monitoring */}
            { perfVisible && <Perf position="top-left" />}
            
            {/* Controls */}
            <OrbitControls
                target={[0, 1.8, 0]} 
                minPolarAngle={Math.PI * 0.35}
                maxPolarAngle={Math.PI * 0.49}
                enableDamping={true}
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                autoRotateSpeed={1.0}
                makeDefault
            />

            {/* Ligthning */}
            <Environment preset={preset}>

                {/* Hot Light */}
                <Lightformer
                    form="rect"
                    intensity={envLight[active].hotIntensity}
                    color={envLight[active].colorHot}
                    scale={[10,5]}
                    position={[10,5,0]}
                    target={[0,0,0]}
                />

                {/* Cold Light */}
                <Lightformer
                    form="rect"
                    intensity={envLight[active].coldIntensity}
                    color={envLight[active].colorCold}
                    scale={[10,5]}
                    position={[-10,1,0]}
                    target={[0,0,0]}
                />

            </Environment>

            {/* Meshes */}
            <Center top>
                <CoffeeCup scale={0.2} rotation-y={Math.PI * 0.5} active={active}/>
            </Center>

            <mesh rotation-x={-Math.PI*0.5} scale={[100,50,20]} position={[0, -0.0005, 0]} receiveShadow>
                <planeGeometry args={[1,1,256,256]}/>
                <MeshReflectorMaterial color='#c5c5c5' metalness={0.2} roughness={1} resolution={2048} blur={[100,100]} mixBlur={1}/>
            </mesh>

            {/* Shadows */}
            <AccumulativeShadows temporal frames={200} colorBlend={1} opacity={1} scale={30} alphaTest={0.85} resolution={1024}>
                <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
            </AccumulativeShadows>

            {/* Fog */}
            <fog attach="fog" args={['#c5c5c5', 8, 15]} />
        </>
    )
}
//R3F+Drei
import { OrbitControls, Environment, Center, AccumulativeShadows, RandomizedLight, MeshReflectorMaterial, Lightformer} from "@react-three/drei"
import { useState, Suspense, startTransition } from "react"

//Debug UI
import { useControls } from "leva"

//Perf
import { Perf } from "r3f-perf"

//Components
import { CoffeeCup } from "../Components/CoffeeCup"

export function Scene3D ({ active }) {

    //Debug UI setup
    const { perfVisible } = useControls('performance',{
        perfVisible: false
    })

    const {enableZoom, enablePan, autoRotate, autoRotateSpeed} = useControls('camera', {
        enableZoom: false,
        enablePan: false,
        autoRotate: true,
        autoRotateSpeed: {value:1, min:0, max:2, step:0.01}
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
        {name:'caramel', colorHot:'#ffc400', colorCold:'#056886'}, 
        {name:'cerise', colorHot:'#ffc400', colorCold:'#056886'}, 
        {name:'classic', colorHot:'#ffc400', colorCold:'#056886'},
        {name:'glace', colorHot:'#ffc400', colorCold:'#056886'},
        {name:'latte', colorHot:'#ffc400', colorCold:'#056886'},
        {name:'matcha', colorHot:'#ffc400', colorCold:'#056886'}, 
        {name:'rose', colorHot:'#ffc400', colorCold:'#056886'},
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
                enableZoom={enableZoom}
                enablePan={enablePan}
                autoRotate={autoRotate}
                autoRotateSpeed={autoRotateSpeed}
                makeDefault
            />

            {/* Ligthning */}
            <Environment preset={preset}>

                {/* Hot Light */}
                <Lightformer
                    form="rect"
                    intensity={10}
                    color={envLight[active].colorHot}
                    scale={[10,5]}
                    position={[10,5,0]}
                    target={[0,0,0]}
                />

                {/* Cold Light */}
                <Lightformer
                    form="rect"
                    intensity={10}
                    color={envLight[active].colorCold}
                    scale={[10,5]}
                    position={[-10,1,0]}
                    target={[0,0,0]}
                />

            </Environment>

            {/* Meshes */}
            <Suspense>
                <Center top>
                    <CoffeeCup scale={0.2} rotation-y={Math.PI * 0.5} active={active}/>
                </Center>
            </Suspense>

            <mesh rotation-x={-Math.PI*0.5} scale={[100,50,20]} position={[0, -0.0005, 0]} receiveShadow>
                <planeGeometry/>
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
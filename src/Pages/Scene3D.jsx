//R3F+Drei
import { OrbitControls, Environment, Center, AccumulativeShadows, RandomizedLight, MeshReflectorMaterial, Lightformer} from "@react-three/drei"

//Components
import { CoffeeCup } from "../Components/CoffeeCup"

//Main
export function Scene3D ({ active }) {

    //Array
    const envLight = [
        {name:'latte', colorHot:'#fffca1', colorCold:'#d37400', hotIntensity:17.0, coldIntensity:9.5},  
        {name:'cerise', colorHot:'#980000ff', colorCold:'#bb0000', hotIntensity:1.2, coldIntensity:5.0},
        {name:'matcha', colorHot:'#46ff00', colorCold:'#7c9302', hotIntensity:4.0, coldIntensity:7.0},
        {name:'rose', colorHot:'#f200ff', colorCold:'#a100b0', hotIntensity:20.0, coldIntensity:10.0}, 
        {name:'classic', colorHot:'#ffffff', colorCold:'#adadad', hotIntensity:20.0, coldIntensity:5.0},
        {name:'caramel', colorHot:'#ffc900', colorCold:'#f0bc43', hotIntensity:20.0, coldIntensity:15.0},
        {name:'glace', colorHot:'#00e2ff', colorCold:'#1d28b7', hotIntensity:20.0, coldIntensity:10.0},
    ]

    return (
        <>    
            {/* Controls */}
            <OrbitControls
                target={[0, 1.8, 0]} 
                minPolarAngle={Math.PI * 0.35}
                maxPolarAngle={Math.PI * 0.49}
                enableDamping={true}
                enableZoom={false}
                enablePan={false}
                autoRotate={true}
                autoRotateSpeed={1.0}
                makeDefault
            />

            {/* Ligthning */}
            <Environment preset="sunset">

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
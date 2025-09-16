import { useGLTF, useTexture } from '@react-three/drei'

export function CoffeeCup(props) {

    //Model Loading
    const { nodes, materials } = useGLTF('./Models/coffee_cup.glb')

    //Texture Loading
    const caramel = useTexture({
        metalnessMap: './Textures/Caramel/CupBodyCaramelMetalness.jpg',
        map: './Textures/Caramel/CupBodyCaramelColor.jpg',
        roughness: './Textures/Caramel/CupBodyCaramelRoughtness.jpg',
    })

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.CupBody.geometry}
                material={nodes.CupBody.material}
                position={[0, 10.568, -0.011]}
                rotation={[0, 1.256, 0]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.CupHead.geometry}
                    material={nodes.CupHead.material}
                    position={[-0.133, 9.82, -0.086]}
                    rotation={[-Math.PI, 0.471, -Math.PI]}
                    scale={[1.064, 1, 1.041]}
                />

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.CupLid.geometry}
                    material={nodes.CupLid.material}
                    scale={[1, 0.783, 1]}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./Models/coffee_cup.glb')

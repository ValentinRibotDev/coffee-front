import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function CoffeeCup({active=0, ...props}) {

    //Model Loading
    const { nodes, materials } = useGLTF('./Models/coffee_cup.glb')

    //Texture Loading function
    const loadTextureSet = (basePath, color) => {
        const tex = useTexture({
            map: `/Textures/${basePath}/CupBody${basePath}Color.jpg`,
            metalnessMap: `/Textures/${basePath}/CupBody${basePath}Metalness.jpg`,
            roughnessMap: `/Textures/${basePath}/CupBody${basePath}Roughness.jpg`,
        })

        Object.values(tex).forEach((t) => {
            if (t instanceof THREE.Texture) t.flipY = false
        })

        return { textures: tex, color }
    }

    //Texture Array
    const variants = [
        { name: 'Caramel', ...loadTextureSet('Caramel', '#d17d2e') },
        { name: 'Cerise', ...loadTextureSet('Cerise', '#c50000') },
        { name: 'Classic', ...loadTextureSet('Classic', '#101010') },
        { name: 'Glace', ...loadTextureSet('Glace', '#ffffff') },
        { name: 'Latte', ...loadTextureSet('Latte', '#a88256') },
        { name: 'Matcha', ...loadTextureSet('Matcha', '#badd3d') },
        { name: 'Rose', ...loadTextureSet('Rose', '#f172b2') },
    ]

    //Carrousel
    const current = variants[active]

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.CupBody.geometry}
                position={[0, 10.568, -0.011]}
                rotation={[0, 1.256, 0]}
            >
                <meshStandardMaterial {...current.textures}/>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.CupHead.geometry}
                    position={[-0.133, 9.82, -0.086]}
                    rotation={[-Math.PI, 0.471, -Math.PI]}
                    scale={[1.064, 1, 1.041]}
                >
                    <meshStandardMaterial color={current.color} roughness={0.15}/>
                </mesh>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.CupLid.geometry}
                    material={nodes.CupLid.material}
                    scale={[1, 0.783, 1]}
                >
                    <meshStandardMaterial color={current.color}/>
                </mesh>

            </mesh>
        </group>
    )
}

useGLTF.preload('./Models/coffee_cup.glb')

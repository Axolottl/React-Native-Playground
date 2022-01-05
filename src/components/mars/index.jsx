import React from "react";
import {useLoader} from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import MarsDayMap from "../../assets/textures/5672_mars_4k_color.jpg";
import MarsNormalMap from "../../assets/textures/5672_mars_4k_normal.jpg";
import {TextureLoader} from "three";

export function Mars(props) {

    const [colorMap, normalMap] = useLoader(TextureLoader, [MarsDayMap,MarsNormalMap]);

    return (
    <>
        <ambientLight intensity={0.03} />
        <spotLight intensity={1} position={[10,5,10]} />
        <mesh>
            <sphereGeometry args={[3.02,32,32]} />
            <meshPhongMaterial 
                opacity={0.1} 
                depthWrite={true} 
                transparent={true} 
                color={"orange"} 
                side={THREE.DoubleSide}>
            </meshPhongMaterial>
        </mesh>
        <mesh>
            <sphereGeometry args={[3,32,32]} />
            <meshStandardMaterial 
                map={colorMap} 
                normalMap={normalMap} />
            <OrbitControls 
                enableRotate={true} 
                enablePan={true} 
                enableZoom={true} 
                zoomSpeed={0.6} 
                panSpeed={0.5} 
                rotateSpeed={0.4}/>
        </mesh>
    </>
    );

}
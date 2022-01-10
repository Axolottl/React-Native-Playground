import React, { useRef } from "react";
import {useFrame, useLoader} from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import MarsDayMap from "../../assets/textures/5672_marsmap4k.jpg";
import MarsNormalMap from "../../assets/textures/5672_mars_4k_normal.jpg";
import MarsCloudMap from "../../assets/textures/mars_cloud_texture_by_aviacionvenezolana_ddneq0x-pre.png";

import { TextureLoader } from "three";
import { TangentSpaceNormalMap } from "three";
import { Camera } from "three";

export function Mars() {
    const [colorMap, normalMap, cloudMap] = useLoader(TextureLoader, [MarsDayMap,MarsNormalMap, MarsCloudMap]);

    const marsRef = useRef();
    const cloud = useRef();
    const meshRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        marsRef.current.rotation.y = elapsedTime / 18;
        cloud.current.rotation.y = elapsedTime / 9;
        meshRef.current.metalness = (Math.cos(elapsedTime)+3)*5;
    });

    return (
    <>
        <ambientLight intensity={0.001} />
        <spotLight
            distance={55}
            castShadow={true}
            color={"white"}
            intensity={0.7} 
            position={[30,-1,0]} />

        <Stars 
            radius={450} 
            depth={100} 
            count={8000} 
            factor={7} 
            saturation={0} 
            fade={true}/>

        <mesh>
            <sphereGeometry args={[3.02,32,32]} />
            <meshStandardMaterial
                opacity={0.2} 
                depthWrite={true} 
                transparent={true} 
                metalness={2.4}
                roughness={19}
                color={"orange"}
                side={THREE.DoubleSide}
                />
        </mesh>
        
        <mesh ref={cloud}>
            <sphereGeometry args={[3.04,32,32]} />
            <meshStandardMaterial ref={meshRef}
                map={cloudMap}
                opacity={0.2}
                depthWrite={true}
                transparent={true}
                roughness={1}
            />
        </mesh>
        <mesh ref={marsRef}>
            <sphereGeometry args={[3,32,32]} />
            <meshStandardMaterial
                map={colorMap}
                normalMap={normalMap}
                normalMapType={TangentSpaceNormalMap}
                normalScale={[0.2,0.2]}
                metalness={0.1}
                roughness={1}/>
                
            <OrbitControls
                enableRotate={true} 
                enablePan={true} 
                enableZoom={true} 
                minDistance={4.0}
                maxDistance={20.0}
                maxZoom={10.0}
                zoomSpeed={0.6} 
                panSpeed={0.5} 
                rotateSpeed={0.4}/>
        </mesh>
    </>
    );

}
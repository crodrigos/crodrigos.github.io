import { Canvas, useFrame } from "@react-three/fiber";
import App from "../app";
import { v6 } from "uuid";
import { useRef } from "react";
import { Color, Mesh, Vector3 } from "three";

const CubeObj = () => {
	const meshRef = useRef<Mesh>(null);

	useFrame((state, delta, frame) => {
        meshRef.current?.rotateX(1/100)
    });

	return (
		<mesh ref={meshRef}>
			<boxGeometry />
			<meshStandardMaterial color={new Color(1,0,0)} />
		</mesh>
	);
};

const AppComponent = () => {
	return (
		<div className="h-full w-full">
			<Canvas>
				<CubeObj />
			</Canvas>
		</div>
	);
};

export const CubeApp: App = {
	id: v6(),
	title: "The Cube",
	component: <AppComponent />,
};

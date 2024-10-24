import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Node are the red dots
const nodes = [
  [-8.7036, 0, 49.0748], [-72.9996, 0, 49.0748], [-75, 0, 49.0748], [-75.9996, 0, 43.8788], 
  [-78.9996, 0, 38.6828], [-44.8512, 0, -13.5364], [-46.8516, 0, -16.9996], [-10.704, 0, 45.6104], 
  [-80.0004, 0, 40.4144], [-38.148, 0, -32.0752], [-34.1484, 0, -32.0752], [-6, 0, -87.7576], 
  [-5.0004, 0, -89.4892], [8.7036, 0, 49.0748], [72.9996, 0, 49.0748], [75, 0, 49.0748], 
  [75.9996, 0, 43.8788], [78.9996, 0, 38.6828], [44.8512, 0, -13.5364], [46.8516, 0, -16.9996], 
  [10.704, 0, 45.6104], [80.0004, 0, 40.4144], [38.148, 0, -32.0752], [34.1484, 0, -32.0752], 
  [6, 0, -87.7576], [5.0004, 0, -89.4892], [0, 0, -87.7576], [11.3127, 0, 6.5311], 
  [0, 0, -13.0622], [-11.3127, 0, 6.5311], [-77.4996, 0, 41.2808], [-74.4996, 0, 46.4768], 
  [-64.0097, 60, 18.6311], [-64.0097, -12, 18.6311], [18.5003, 60, -66.1068], [18.5003, -12, -66.1068], 
  [54.5003, 60, -3.753], [54.5003, -12, -3.753], [72.0203, 60, 26.5926], [72.0203, -12, 26.5926], 
  [-24.1573, 60, 45.7931], [-24.1573, -36, 45.7931], [-59.178, 60, 46.2687], [-59.178, -12, 46.2687]
];

// Lines between the red dots
const connections = [
  [4, 30], [32, 8], [31, 6], [7, 1], [17, 28], [17, 21], [17, 19], [20, 14], [3, 16], 
  [9, 13], [26, 22], [29, 27], [10, 23], [24, 27], [11, 27], [5, 2], [15, 18], [25, 12], 
  [33, 34], [35, 36], [37, 38], [39, 40], [41, 42], [43, 44]
];

function Line({ start, end }) {
  const points = new THREE.Vector3().fromArray(start).toArray().concat(new THREE.Vector3().fromArray(end).toArray());
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={new Float32Array(points)} itemSize={3} />
      </bufferGeometry>
      {/* to thick line npm install three.meshline */}
      <lineBasicMaterial color="white" linewidth={10}/>
    </line>
  );
}

function Scene() {
  return (
    <>
      {/* Draw the dots */}
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="blue" />
        </mesh>
      ))}

      {/* Draw the lines between red dots */}
      {connections.map(([startIdx, endIdx], index) => (
        <Line key={index} start={nodes[startIdx - 1]} end={nodes[endIdx - 1]}/>
      ))}
    </>
  );
}

function MountStickModel() {
  return (
    <Canvas camera={{ position: [30, 180, 200], fov: 50}} style={{height:"100vh", backgroundColor:"#242424"}}>
      <OrbitControls />
      <ambientLight />
      <Scene />
    </Canvas>
  );
}

export default MountStickModel;

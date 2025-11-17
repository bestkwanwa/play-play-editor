/**
 * TestPrimitives - Simple geometric primitives for testing viewport
 */

export function TestPrimitives() {
  return (
    <group>
      {/* Test Cube */}
      <mesh position={[-2, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Test Sphere */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      {/* Test Cylinder */}
      <mesh position={[2, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color="#ffe66d" />
      </mesh>

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}

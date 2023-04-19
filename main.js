import * as THREE from 'three';
import './style.css' 

const scene = new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(8, 1);
const material = new THREE.MeshStandardMaterial({
  color: 'white',
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Create a wireframe geometry based on the shape
const wireframeGeometry = new THREE.WireframeGeometry(geometry);

// Create a material for the wireframe
const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

// Create a mesh for the wireframe using the wireframe geometry and material
const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
wireframe.scale.set(1.5, 1.5, 1.5);
scene.add(wireframe);

//WireFrameOnShape

// Create a wireframe geometry based on the shape
const wireframe2Geometry = new THREE.WireframeGeometry(geometry);

// Create a material for the wireframe
const wireframe2Material = new THREE.LineBasicMaterial({ color: 0x850101 });

// Create a mesh for the wireframe using the wireframe geometry and material
const wireframe2 = new THREE.LineSegments(wireframe2Geometry, wireframe2Material);
wireframe2.scale.set(1.02, 1.02, 1.02);
scene.add(wireframe2);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


//Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height)
camera.position.z = 60
scene.add(camera)


//Lights
const innerLight = new THREE.PointLight( 0xff0000, 1.5, 100 );
innerLight.position.set( 0, 10, 50 );
scene.add(innerLight);
const outerLight = new THREE.PointLight( 0xff0000, 1, 100 );
outerLight.position.set( 10, 20, 50 );
scene.add( outerLight );

//Renderer

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//Resize
window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.aspect = sizes.width / sizes.height;  
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})
const loop = () => {
  wireframe.rotation.x -= 0.01
  wireframe.rotation.y -= 0.01
  wireframe2.rotation.x += 0.01
  wireframe2.rotation.y += 0.01
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}
loop()
import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('planoDeFundo');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const texture = new THREE.TextureLoader().load('https://i.imgur.com/WdVIYrM.jpg'); // Basketball texture
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const basketball = new THREE.Mesh(geometry, material);
    scene.add(basketball);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        basketball.rotation.x += 0.01;
        basketball.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});


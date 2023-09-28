﻿"use strict";
import {PerspectiveCamera, Scene, WebGLRenderer} from "./build/three.module.js";
import {SolarSystem} from "./SolarSystem.js";
import {OrbitControls} from "./build/OrbitControls.js";
import {VRButton} from "./build/VRButton.js";

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const fov = 75;
const near = 0.1;
const far = 100;

const camera = new PerspectiveCamera(fov, aspect, near, far);

const canvas = document.createElement('canvas');
const context = canvas.getContext('webgl2');

const renderer = new WebGLRenderer({canvas});
renderer.setClearColor(0x000000);
renderer.setSize(width, height);

document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

const scene = new Scene();
const solarSystem = new SolarSystem(scene);

renderer.setAnimationLoop(render)

function render(){
    solarSystem.animate();

    renderer.render(scene, camera);

    //window.requestAnimationFrame(render);
}

render();
<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Face3, Geometry } from 'three/examples/jsm/deprecated/Geometry'

console.log(THREE)
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
/**
 * 辅助三维坐标系 AxisHelper
 */
var axisHelper = new THREE.AxesHelper(300);
scene.add(axisHelper);
/**
 * 创建网格模型
 */
const geometry = new THREE.BufferGeometry()

const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  80, 0, 0, //顶点2坐标
  80, 80, 0, //顶点3坐标

  0, 0, 0, //顶点4坐标   和顶点1位置相同
  80, 80, 0, //顶点5坐标  和顶点3位置相同
  0, 80, 0, //顶点6坐标
])

const attr = new THREE.BufferAttribute(vertices, 3)

geometry.attributes.position = attr

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中
// 点光源2  位置和point关于原点对称
var point2 = new THREE.PointLight(0xffffff);
point2.position.set(-400, -200, -300); //点光源位置
scene.add(point2); //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
// console.log(scene)
// console.log(scene.children)

// 初始化相机、渲染区域尺寸
const initCamera = (): [camera: THREE.OrthographicCamera, width: number, height: number] => {
  /**
   * 相机设置
   */
  var width = threeRef.value!.clientWidth; //窗口宽度
  var height = threeRef.value!.clientHeight; //窗口高度
  var k = width / height; //窗口宽高比
  var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
  //创建相机对象
  var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(200, 300, 200); //设置相机位置
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
  return [
    camera,
    width,
    height
  ]
}

// 创建渲染器对象
const initRender = (width: number, height: number): THREE.WebGLRenderer => {
  /**
   * 创建渲染器对象
   */
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);//设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
  threeRef.value!.appendChild(renderer.domElement); //body元素中插入canvas对象
  return renderer
}

const threeRef = ref<HTMLDivElement | null>(null)
onMounted(() => {
  const [camera, width, height] = initCamera()
  const renderer = initRender(width, height)
  // // 旋转渲染
  // let T0 = +new Date();//上次时间
  // const render = () => {
  //   let T1 = +new Date();//本次时间
  //   let t = T1 - T0;//时间差
  //   T0 = T1;//把本次时间赋值给上次时间
  //   requestAnimationFrame(render);
  //   renderer.render(scene, camera);//执行渲染操作
  //   mesh.rotateY(0.001 * t);//旋转角速度0.001弧度每毫秒
  // }
  // // setInterval(render, 30)
  // render()

  // 鼠标控制模型
  function render() {
    console.log('渲染啦！')
    renderer.render(scene, camera);//执行渲染操作
  }
  render();
  var controls = new OrbitControls(camera, renderer.domElement);//创建控件对象
  controls.addEventListener('change', render);//监听鼠标、键盘事件
})
</script>

<template>
  <div ref="threeRef" class="three-container"></div>
</template>

<style lang="scss" scoped>
.three-container {
  height: 100%;
}
</style>

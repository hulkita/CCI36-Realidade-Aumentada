/************
 *  Trabalho 1 Bim - Realidade Aumentada
 *  Grupo: HSO
 *  Alunos: 
 *        - Carlos Renato de Andrade Figueiredo
 *        - Matheus Martins
 *        - Samara Ribeiro Silva
 * 
 */


/** Config Variaveis */
// tamanho canvas
var canvasnome = "mycanvas"
var altura = 600//window.innerHeight * 0.7; 
var largura = 600//window.innerWidth * 0.7;
var razao = largura / altura;
//imagem
var imagem = 'minhapista4.jpg'

// camera
var camera_Width = 1500;
var cameraHeight = camera_Width / razao

// percurso carro
var xPista = largura / 2 ;
var yPista = altura / 2 ;
var xPistaIni = 100;
var yPistaIni = 100;
//carro
var object_Car = makeCar();
//posição inicial do carro
object_Car.position.x = xPistaIni;
object_Car.position.y = yPistaIni;
var car_speed = 10
var carMove = true

// criando cena
var scene = new THREE.Scene();
// criando camera
var camera = new THREE.PerspectiveCamera(75, razao, 0.1, 1000);
// orbit control
var controls = new THREE.OrbitControls(camera);
//axes e grid helper
var axesHelper = new THREE.AxesHelper(150);
var gridHelper = new THREE.GridHelper(300, 10 );
// add renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById(canvasnome),
  antialias: true,
  alpha: true
});

var ambient_light = new THREE.AmbientLight(0xffffff, 0.6);
var directional_light = new THREE.DirectionalLight(0xffffff, 0.6);
/** Fim config variaveis */

/** Configuraçoes */

//definicoes camera
camera.position.set(0, 0, 500);
camera.up.set(0, 0, 1);
dVector = new THREE.Vector3(0, 0, 0);
camera.lookAt(dVector);

// config orbit control
controls.target.set(0, 10, 0);

// config renderer
renderer.setSize(largura, altura);
document.body.appendChild(renderer.domElement);

//adicionando imagem de fundo
scene.background = new THREE.TextureLoader().load(imagem);;

//arrumando imagem na tela
const targetAspect = razao;
const imageAspect = 544 / 544;
const factor = imageAspect / targetAspect;
// When factor larger than 1, that means texture 'wilder' than target。 
// we should scale texture height to target height and then 'map' the center  of texture to target， and vice versa.
scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
scene.background.repeat.y = factor > 1 ? 1 : factor;

// config directional light
directional_light.position.set(100, -300, 400);

// config gridhelper 
gridHelper.rotation.x = (Math.PI)/2;
gridHelper.position.x = largura/4
gridHelper.position.y = altura/4

/** Fim Configurações */

/** Funcoes */
// criando carrinho
function makeCar() {
  var car = new THREE.Group();
  //add rodas
  var wheel = makeWheel();
  positions = [[-18, 18], [-18, -18], [18, 18], [18, -18]];
  for (var i = 0; i < positions.length; i++) {
    x = positions[i][0]
    y = positions[i][1]
    m = wheel.clone()
    m.position.x = x
    m.position.y = y
    car.add(m)
  }
  //add parte principal
  var main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  main.position.z = 12;
  car.add(main);
  // add cabine
  var cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 24, 12),
    new THREE.MeshLambertMaterial({ color: 0x0000ff })
  );
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  car.add(cabin);
  return car;
}

//criando rodas
function makeWheel() {
  const geometry = new THREE.CylinderGeometry(6, 6, 5, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  var wheel = new THREE.Mesh(geometry, material);
  wheel.position.z = 6;
  return wheel;
}

function updateCar() {
  if (carMove == false) return;
  if (object_Car.position.y <= yPistaIni) {
    if (object_Car.position.x > (xPistaIni-5) && object_Car.position.x < xPista) {
      object_Car.rotation.z = Math.PI * 2;
      object_Car.position.x += car_speed;
    }
  }
  if (object_Car.position.x >= xPista) {
    if (object_Car.position.y > (yPistaIni-5) && object_Car.position.y < yPista) {
      object_Car.rotation.z = Math.PI / 2;
      object_Car.position.y += car_speed;
    }
  }
  if (object_Car.position.y >= yPista) {
    if (object_Car.position.x > xPistaIni && object_Car.position.x < (xPista * 1.05)) {
      object_Car.rotation.z = Math.PI;
      object_Car.position.x -= car_speed;
    }
  }
  if (object_Car.position.x <= xPistaIni) {
    if (object_Car.position.y > yPistaIni && object_Car.position.y < (yPista * 1.05)) {
      object_Car.rotation.z = (Math.PI / 2) * 3;
      object_Car.position.y -= car_speed;
    }
  }
  //console.log("X: "+object_Car.position.x+" Y: "+object_Car.position.y+ " tamanho tela:"+largura+"x"+altura)
}

// ocultar
window.addEventListener("keydown", function (event) {
  if (event.key == "PageUp") {
    if(object_Car.visible == true)
      object_Car.visible = false;
    else
      object_Car.visible = true;
    return;
  }
  if (event.key == "PageDown") {
    if(axesHelper.visible == true){
      axesHelper.visible = false;
      gridHelper.visible = false;
    }      
    else{
      axesHelper.visible = true;
      gridHelper.visible = true;
    }     
    return;
  }
});

var animate = function () {
  requestAnimationFrame(animate);
  updateCar();
  controls.update();
  renderer.render(scene, camera);
  //console.log(camera.projectionMatrix)
};
/** Fim funçoes */

/** Scene add */
scene.add(axesHelper);
scene.add(gridHelper);
scene.add(object_Car);
scene.add(ambient_light);
scene.add(directional_light);
/** Fim Scene add */

//alert("Pressione PageUP para mostrar ou esconder o carro.\nPressione PageDown para mostrar ou esconder os eixos.");

animate();
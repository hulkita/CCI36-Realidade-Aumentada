/************
 *  Trabalho 1 Bim - Realidade Aumentada
 *  Grupo: HSO
 *  Alunos: 
 *        - Carlos Renato de Andrade Figueiredo
 *        - Matheus da Silva xxMartins
 *        - Samara Ribeiro Silva
 * 
 */


/** Config Variaveis */
// tamanho canvas
var canvasnome = "mycanvas"
var altura = 876 //window.innerHeight//600//window.innerHeight * 0.7; 
var largura = 1000//window.innerWidth//600//window.innerWidth * 0.7;
var razao = largura / altura;
//imagem
var imagem = 'minhapista8.jpg'

// camera
/*var camera_Width = 1500;
var cameraHeight = camera_Width / razao*/

// percurso carro
var xPista = -1;
var zPista = 1;
var xPistaIni = -0.5;
var zPistaIni = 0.5 ;
//carro
var object_Car = makeCar();
var car_speed = 0.01
var carMove = true
var carScale = 0.005
// criando camera
var camera = new THREE.PerspectiveCamera(30, razao, 0.01, 1000);
// criando cena
var scene = new THREE.Scene();
//axes e grid helper
var axesHelper = new THREE.AxesHelper(15);
var gridHelper = new THREE.GridHelper(25, 50);
// add renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById(canvasnome),
  antialias: true,
  alpha: true
});

var ambient_light = new THREE.AmbientLight(0xffffff, 0.6);
var directional_light = new THREE.DirectionalLight(0xffffff, 0.6);

var gridAparece = document.getElementById("gridhelper");
var axesAparece = document.getElementById("axeshelper");
var carAparece  = document.getElementById("car");
var carStop     = document.getElementById("stopcar");

// matrix e position encontrados em "encurtador.com.br/iGIL0"
var m = new THREE.Matrix4();
      m.set(
            0.6982829434563605,   -0.7157625632287165,  -0.009213249056587726,  0.05389258721612304,
            -0.44214467755840614, -0.4211535266535143,  -0.7919203186521232,    0.34156311694689745,
            0.5629467248192267,   0.557058040124694,    -0.6105549319657817,    -6.986757448448397,
            0.0,                  0.0,                   0.0,                   1.0   
      );

/** Fim config variaveis */

/** Configuraçoes */

//definicoes camera


camera.applyMatrix4(m);
camera.position.set(4.04656026,  4.07445422, -3.99481192); 
camera.lookAt(0, 0, 0);
camera.setViewOffset(largura,altura,20,20,largura,altura);
camera.updateMatrixWorld();

//adicionando imagem de fundo
scene.background = new THREE.TextureLoader().load(imagem);

// config directional light
directional_light.position.set(100, -300, 400);

// config carro
object_Car.position.x = xPistaIni;
object_Car.position.z = zPistaIni;
object_Car.scale.set(carScale,carScale,carScale);
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
    z = positions[i][1]
    m = wheel.clone()
    m.position.x = x
    m.position.z = z
    car.add(m)
  }
  //add parte principal
  var main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  main.position.y = 12;
  car.add(main);
  // add cabine
  var cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 12, 24),
    new THREE.MeshLambertMaterial({ color: 0x0000ff })
  );
  cabin.position.x = -6;
  cabin.position.y = 25.5;
  car.add(cabin);
  
  //car.rotation.x=-Math.PI/2;
  return car;
}
//criando rodas
function makeWheel() {
  const geometry = new THREE.CylinderGeometry(6, 6, 5, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  var wheel = new THREE.Mesh(geometry, material);
  wheel.position.y = 6;
  wheel.rotation.x = Math.PI/2;
  return wheel;
}

function updateCar() {
  // implementando movimento
  if (carMove == true) {
  if (object_Car.position.z <= zPistaIni) {
    if (object_Car.position.x <= xPistaIni && object_Car.position.x > xPista) {        
      object_Car.position.z =  zPistaIni  
      object_Car.rotation.y = -Math.PI;
      object_Car.position.x -= car_speed;
    }
  }
  if (object_Car.position.x <= xPista) {
    if (object_Car.position.z >= zPistaIni && object_Car.position.z < zPista) {
      object_Car.position.x = xPista
      object_Car.rotation.y = -Math.PI / 2;
      object_Car.position.z += car_speed;
      
    }
  }
  if (object_Car.position.z >= zPista) {    
    if (object_Car.position.x < xPistaIni && object_Car.position.x >= xPista) {      
      object_Car.position.z = zPista
      object_Car.rotation.y = Math.PI*2;
      object_Car.position.x += car_speed;
      
    }
  }
  if (object_Car.position.x >= xPistaIni) {
    if (object_Car.position.z > zPistaIni && object_Car.position.z <= zPista ) {
      object_Car.position.x = xPistaIni
      object_Car.rotation.y = Math.PI / 2;
      object_Car.position.z -= car_speed;
      
    }
  }
}
  //console.log("X: "+object_Car.position.x+" Z: "+object_Car.position.z+ " tamanho tela:"+largura+"x"+altura)
}


// ocultar
window.addEventListener("keydown", function (event) {
  if (event.key == "c") {
    if(object_Car.visible == true){
      object_Car.visible = false;
      carAparece.checked = false;
    }      
    else{
      object_Car.visible = true;
      carAparece.checked = true;
    }      
    return;
  }
  if (event.key == "v") {
    if(gridHelper.visible == true){      
      gridHelper.visible = false;
      gridAparece.checked = false;
    }      
    else{
      gridHelper.visible = true;
      gridAparece.checked = true;
    }     
    return;
  }
  if (event.key == "b") {
    if(axesHelper.visible == true){
      axesHelper.visible = false;
      axesAparece.checked = false;
    }      
    else{
      axesHelper.visible = true;
      axesAparece.checked = true;
    }     
    return;
  }
  if (event.key == "x") {
    if(carMove==true){
      carMove = false;
      carStop.checked = false;
    }      
    else{
      carMove = true;
      carStop.checked = true;
    }     
    return;
  }
});

document.getElementById("axeshelper").onclick = function() {
  if(axesAparece.checked){
    axesHelper.visible = true;
  }
  else{
    axesHelper.visible = false;
  }
}

document.getElementById("gridhelper").onclick = function() {
  if(gridAparece.checked){
    gridHelper.visible = true;
  }
  else{
    gridHelper.visible = false;
  }
}
document.getElementById("car").onclick = function() {
  if(carAparece.checked){
    object_Car.visible = true;
  }
  else{
    object_Car.visible = false;
  }
}

document.getElementById("stopcar").onclick = function() {
  console.log("stop!")
  if(carStop.checked){
    carMove = true;
  }
  else{
    carMove = false;
  }
}

var animate = function () {
  requestAnimationFrame(animate);
  updateCar();
  //controls.update();
  renderer.render(scene, camera);
  //console.log(camera.position)
};
/** Fim funçoes */

/** Scene add */
scene.add(axesHelper);
scene.add(gridHelper);
//scene.add(camera);
scene.add(object_Car);
scene.add(ambient_light);
scene.add(directional_light);
/** Fim Scene add */

animate();
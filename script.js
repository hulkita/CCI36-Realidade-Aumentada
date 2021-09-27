//window.focus();
var scene = new THREE.Scene();

var razao = window.innerWidth / window.innerHeight;
var camera_Width = 1500;
var cameraHeight = camera_Width / razao

var camera = new THREE.OrthographicCamera(
  camera_Width / -2,
  camera_Width / 2,
  cameraHeight / 2,
  cameraHeight / -2,
  0,
  1000

);

camera.position.set(0, 0, 300);
//camera.up.set(0, 0, 1);
dVector = new THREE.Vector3(0, 0, 0);
camera.lookAt(dVector);

//renderMap(cameraWidth, cameraHeight * 2);


//var controls = new THREE.OrbitControls(camera);
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function getLineMarkings(mapWidth, mapHeight) {
  canvas.width = mapWidth;
  canvas.height = map.mapHeight;

  var context = canvas.getContext("2d");

  context.fillStyle = "#546E90"

}





var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("mycanvas"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//var controls = new THREE.OrbitControls( camera );
//var axesHelper = new THREE.AxesHelper( 10 );
//scene.add( axesHelper );


//var leg_geom = new THREE.BoxGeometry(0.3,2.0,0.3);
//var leg_mat = new THREE.MeshBasicMaterial({color:0xFF5522});
//var leg = new THREE.Mesh(leg_geom, leg_mat);
//scene.add(leg);

//adicionando imagem de fundo
tx1 = new THREE.TextureLoader().load('minhapista.png');
scene.background = tx1;




var object_Car = Car();
object_Car.position.x = -480;
object_Car.position.y = -280;
//playerCar.rotation.z = Math.PI / 2;
scene.add(object_Car);


var ambient_light = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient_light);


var directional_light = new THREE.DirectionalLight(0xffffff, 0.6);
directional_light.position.set(100, -300, 400);
scene.add(directional_light);



function Car() {
  var car = new THREE.Group();

  var backWheel = Wheel();
  backWheel.position.x = -18;
  car.add(backWheel);

  var frontWheel = Wheel();
  frontWheel.position.x = 18;
  car.add(frontWheel);

  var main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color: 0xff00ff })
  );
  main.position.z = 12;
  car.add(main);

  var cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 24, 12),
    new THREE.MeshLambertMaterial({ color: 0x0000ff })
  );
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  car.add(cabin);

  return car;

}

function Wheel() {
  var wheel = new THREE.Mesh(
    new THREE.BoxBufferGeometry(12, 40, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  );
  wheel.position.z = 6;
  return wheel;
}

//window.addEventListener("keydown", function (event)

var playerOn = 0;
function updateCar() {

  console.log(object_Car.position.y);

  if (playerOn == 1) {
    if (object_Car.position.y == -280) {
      if (object_Car.position.x > -485 && object_Car.position.x < +410) {
        object_Car.rotation.z = Math.PI * 2;
        object_Car.position.x += 10;
      }
    }

    if (object_Car.position.x == +410) {
      if (object_Car.position.y > -285 && object_Car.position.y < +250) {
        object_Car.rotation.z = Math.PI / 2;
        object_Car.position.y += 10;

      }
    }
    if (object_Car.position.y == +250) {
      if (object_Car.position.x > -480 && object_Car.position.x < 415) {
        object_Car.rotation.z = Math.PI;
        object_Car.position.x -= 10;

      }
    }
    if (object_Car.position.x == -480) {
      if (object_Car.position.y > -280 && object_Car.position.y < 255) {
        object_Car.rotation.z = (Math.PI / 2) * 3;
        object_Car.position.y -= 10;

      }
    }

  }
}

window.addEventListener("keydown", function (event) {
  if (event.key == "ArrowUp") {
    playerOn = 1;
    return;
  }
  
});

window.addEventListener("keyup", function (event) {
  if (event.key == "ArrowUp") {
    playerOn = 0;
    return;
  }
  
});

var animate = function () {

  requestAnimationFrame(animate);
  updateCar();
  //controls.update();
  renderer.render(scene, camera);

};
animate();
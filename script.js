//window.focus();
var scene = new THREE.Scene();

var razao = window.innerWidth / window.innerHeight;
var camera_Width = 1500;
var cameraHeight = camera_Width / razao

/*var camera = new THREE.OrthographicCamera(
  camera_Width / -2,
  camera_Width / 2,
  cameraHeight / 2,
  cameraHeight / -2,
  0,
  1000

);*/

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 300);
camera.up.set(0, 0, 1);
dVector = new THREE.Vector3(0, 0, 0);
camera.lookAt(dVector);

//renderMap(cameraWidth, cameraHeight * 2);


var controls = new THREE.OrbitControls(camera);
controls.target.set(0, 10, 0);
var axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);


function getLineMarkings(mapWidth, mapHeight) {
  canvas.width = mapWidth;
  canvas.height = map.mapHeight;

  var context = canvas.getContext("2d");

  context.fillStyle = "#546E90"

}





var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("mycanvas"),
  antialias: true,
  alpha: true
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
tx1 = new THREE.TextureLoader().load('minhapista3.jpg');
scene.background = tx1;
//window.innerWidth / window.innerHeight;
//arrumando imagem na tela
const targetAspect = window.innerWidth / window.innerHeight;
const imageAspect = 544 / 544;
const factor = imageAspect / targetAspect;
// When factor larger than 1, that means texture 'wilder' than target。 
// we should scale texture height to target height and then 'map' the center  of texture to target， and vice versa.
scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
scene.background.repeat.y = factor > 1 ? 1 : factor;


//posição inicial do carro
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

  var backWheel1 = Wheel();
  backWheel1.position.x = -18;
  backWheel1.position.y = 18 ;
  car.add(backWheel1);

  var backWheel2 = Wheel();
  backWheel2.position.x = -18;
  backWheel2.position.y = -18 ;
  car.add(backWheel2);

  var frontWheel1 = Wheel();
  frontWheel1.position.x = 18;
  frontWheel1.position.y = 18;
  car.add(frontWheel1);

  var frontWheel2 = Wheel();
  frontWheel2.position.x = 18;
  frontWheel2.position.y = -18;
  car.add(frontWheel2);

  var main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
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

  const geometry = new THREE.CylinderGeometry( 6, 6, 5, 32 );
  const material = new THREE.MeshBasicMaterial( {color: 0x000000} );
  //const cylinder = new THREE.Mesh( geometry, material );

  var wheel = new THREE.Mesh( geometry, material );
  wheel.position.z = 6;
  return wheel;
}
//velocidade do carro
var car_speed = 10
//window.addEventListener("keydown", function (event)

//variaveis de movimento
var playerOn = 0;
var go_right = 0;
var go_left = 0;
var go_down = 0;

//var tese_z = 1;

function updateCar() {

  console.log(object_Car.position.y);
  /*
  if (tese_z == 1) {

    object_Car.position.z -= 0.5
  }*/
  if (playerOn == 1) {

    
    object_Car.rotation.z = Math.PI / 2;
    object_Car.position.y += car_speed;
    
    if (object_Car.position.y == -280) {
      if (object_Car.position.x > -485 && object_Car.position.x < +410) {
        object_Car.rotation.z = Math.PI * 2;
        object_Car.position.x += car_speed;
      }
    }

    if (object_Car.position.x == +410) {
      if (object_Car.position.y > -285 && object_Car.position.y < +250) {
        object_Car.rotation.z = Math.PI / 2;
        object_Car.position.y += car_speed;

      }
    }
    if (object_Car.position.y == +250) {
      if (object_Car.position.x > -480 && object_Car.position.x < 415) {
        object_Car.rotation.z = Math.PI;
        object_Car.position.x -= car_speed;

      }
    }
    if (object_Car.position.x == -480) {
      if (object_Car.position.y > -280 && object_Car.position.y < 255) {
        object_Car.rotation.z = (Math.PI / 2) * 3;
        object_Car.position.y -= car_speed;

      }
    }

  } else {
    if (go_right == 1) {
      object_Car.rotation.z = Math.PI * 2;
      //object_Car.rotation.x = Math.PI / 4;
      object_Car.position.x += car_speed;
    } else {
      if (go_left == 1) {
        //object_Car.rotation.x = Math.PI * 2;
        object_Car.rotation.z = Math.PI;
        object_Car.position.x -= car_speed;
      } else {
        if (go_down == 1) {
          object_Car.rotation.z = (Math.PI / 2) * 3;
          object_Car.position.y -= car_speed;
        }
      }

    }

  }

}

window.addEventListener("keydown", function (event) {
  if (event.key == "ArrowUp") {
    playerOn = 1;
    go_down = 0;
    go_left = 0;
    go_right = 0;
    return;
  }
  if (event.key == "ArrowRight") {
    go_right = 1;
    go_left = 0;
    playerOn = 0;
    go_down = 0;
    return;
  }
  if (event.key == "ArrowLeft") {
    go_left = 1;
    playerOn = 0;
    go_down = 0;
    go_right = 0;
    return;
  }
  if (event.key == "ArrowDown") {
    go_left = 0;
    playerOn = 0;
    go_down = 1;
    go_right = 0;
    return;
  }

});


window.addEventListener("keyup", function (event) {
  if (event.key == "ArrowUp") {
    playerOn = 0;
    return;
  }
  if (event.key == "ArrowDown") {
    go_down = 0;
    return;
  }
  if (event.key == "ArrowLeft") {
    go_left = 0;
    return;
  }
  if (event.key == "ArrowRight") {
    go_right = 0;
    return;
  }
  
});

var percurso_em_x = 0
var percurso_em_y = 0

var tamanho_x = 800
var tamanho_y = 400

function updateCar2() {

  //object_Car.rotation.z = Math.PI / 2;
  //object_Car.position.y += car_speed;
  
  if (object_Car.position.y == -280) {
    if (object_Car.position.x > -485 && object_Car.position.x < +410) {
      object_Car.rotation.z = Math.PI * 2;
      object_Car.position.x += car_speed;
    }
  }

  if (object_Car.position.x == +410) {
    if (object_Car.position.y > -285 && object_Car.position.y < +250) {
      object_Car.rotation.z = Math.PI / 2;
      object_Car.position.y += car_speed;

    }
  }
  if (object_Car.position.y == +250) {
    if (object_Car.position.x > -480 && object_Car.position.x < 415) {
      object_Car.rotation.z = Math.PI;
      object_Car.position.x -= car_speed;

    }
  }
  if (object_Car.position.x == -480) {
    if (object_Car.position.y > -280 && object_Car.position.y < 255) {
      object_Car.rotation.z = (Math.PI / 2) * 3;
      object_Car.position.y -= car_speed;

    }
  }



  
}

//comentario para testar github
var animate = function () {

  requestAnimationFrame(animate);
  //updateCar();
  updateCar2();
  controls.update();
  renderer.render(scene, camera);
  console.log(camera.projectionMatrix)
};
animate();
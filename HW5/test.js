
var camera, scene, renderer;
var circle, pos, vel;


var speeds = 100;



var dt = 0.1;

init();
animate();

jQuery(function($) {
  
  $('#mirror').text(speeds/2);
  $('#speed').on('input', function() {
    speeds = parseInt($('#speed').val());
    $('#mirror').text(speeds/2);
    dt = speeds * 0.001;
  });
});


function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.OrthographicCamera(-100, 100, 100, -100, -10, 100);
  camera.position.z = 50;

  ////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
  gridXZ.rotation.x = Math.PI / 2;
  scene.add(gridXZ);

  var textureLoader = new THREE.TextureLoader().load("https://e7.pngegg.com/pngimages/307/201/png-clipart-dvd-logo-blu-ray-disc-dvd-video-logo-dvd-logo-icon-miscellaneous-blue.png");                    


  let geometry = new THREE.BufferGeometry();
  let points = [];
  points.push(
    new THREE.Vector3(-80, -80, 0),
    new THREE.Vector3(80, -80, 0),
    new THREE.Vector3(80, 80, 0),
    new THREE.Vector3(-80, 80, 0),
    new THREE.Vector3(-80, -80, 0));
  geometry.setFromPoints(points);
  var border = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: 'blue'
  }));
  scene.add(border);

  circle = new THREE.Mesh(new THREE.CircleGeometry(10, 20, 20), new THREE.MeshBasicMaterial({
    color: 'yellow',
    //map : textureLoader
  }));
  scene.add(circle);

  pos = new THREE.Vector3();
  vel = new THREE.Vector3(10, 20, 0);
}

var color = false;

function changeColor() {
	if(color === false){
       		circle.material.color.set('cyan');
       		color = true;
    	}else{
       		circle.material.color.set('yellow');
       		color = false;
    	}
}



function getPos () {
	// Call api 
	// Need to be replaced by a public ip address
	$.get( "http://127.0.0.1:1337/api?x=" + vel.x +"&y="+ vel.y + "&posX=" + pos.x + "&posY=" + pos.y, function( data ) {
		if(data && data.output){
			var coords = data.output.split (" ");
			//vel.set (coords[0], coords[1], 0.0);
			
			//vel.x = coords[0];
			//vel.y = coords[1];
			//pos.setX(coords[2]);
			//pos.setY(coords[3]);
			
			if(vel.x != coords[0] && pos.x > 70){
				vel.x = coords[0];
				pos.setX(70);
				changeColor();
			}
			if(vel.x != coords[0] && pos.x < -70){
				vel.x = coords[0];
				pos.setX(-70);
				changeColor();
			}
			
			if(vel.y != coords[1] && pos.y > 70){
				vel.y = coords[1];
				pos.setY(70);
				changeColor();
			}
			if(vel.y != coords[1] && pos.y < -70){
				vel.y = coords[1];
				pos.setY(-70);
				changeColor();
			}

			//pos.set (coords[2], coords[3], 0.0);
			console.log (coords[0] + ": " + coords[1] + ": " + coords[2] + ": " + coords[3]);
		}
	});
}




function animate() {
  
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  
  pos.add(vel.clone().multiplyScalar(dt));
  
  /*
  if (pos.x > 70 || pos.x < -70)
    vel.x *= -1;
    
    //circle.material.color.set('cyan');
  if (pos.y > 70 || pos.y < -70)
    vel.y *= -1;
    //circle.material.color.set('yellow');
  */
  
  
  getPos(); // should use setInterval (unless the Shell does not respond as fast
  circle.position.copy(pos);
}


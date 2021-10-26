
img = "";
objects = [];
status = "";

function preload() {
  img = loadImage('dog_cat.jpg');
  alarm= loadSound("alarm.mp3")
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}


function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      if(objects[i].label=="person"){
        document.getElementById("status").innerHTML = "Status : Baby Detected";
         alarm.stop();
      }
      else{
        document.getElementById("status").innerHTML = "Status : Baby Not Detected";
        alarm.play();
      }
    }
    if(objects.length==0){
      document.getElementById("status").innerHTML = "Status : Baby Not Detected";
        alarm.play();
    }
  }
}

objects = [];
status1 = "";
object_name = document.getElementById("object_name");

function preload() {
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(720, 350);
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 500, 500);
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)  {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                document.getElementById("object_found").innerHTML = object_name + " Found";
                document.getElementById("status").innerHTML = "Object mentioned found";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}
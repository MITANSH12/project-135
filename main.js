status = "";
objects = [];


function preload() {

}
function setup() {
canvas = createCanvas(480 , 400);
canvas.center();
video = createCapture(VIDEO);
video.hide();

}
function draw() {
image(video , 0 , 0 , 480 , 400);
if(status != "") {
    objectDetector.detect(video , gotResult);

    for (let i = 0; i < objects.length; i++) {
    
        if(object_name == objects[i].label) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = "Status: Object Mentioned found";
            document.getElementById("found").innerHTML = object_name + "found";
            speak(object_name);
        }

        document.getElementById("status").innerHTML = "Status: Object Detected";
    
        fill("red")
        percent = floor(objects[i].confidence * 100);
        strokeWeight(1);
        text(objects[i].label + "  " + percent + " %", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("red");
        strokeWeight(5);
        rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height  );
    }
 
    

}
}
function start() {

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("objectName").value;
}
function modelLoaded() {
    console.log("model loaded");
    status = true;
    objectDetector.detect(video , gotResult);
}
function gotResult(error , results) {
    if (error) {
    console.error(error);
    }
    else {
    console.log(results);
    objects= results;
    }
    }
    function speak(object_name) {
        synth = window.speechSynthesis;
        speakData = object_name + "found";
        var utterThis = new SpeechSynthesisUtterance(speakData);
        synth.speak(utterThis);
    }
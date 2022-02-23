song = "";
LeftwristX = 0;
RightwristX = 0;
LeftwristY = 0;
RightwristY = 0;

function preload(){
    song = loadSound("Megalovania.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
            scoreRightWrist = results[0].pose.keypoints[10].score;
            scoreLeftWrist = results[0].pose.keypoints[9].score;
            console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        console.log(results);
        LeftwristX = results[0].pose.leftWrist.x;
        RightwristX = results[0].pose.rightWrist.x;
        LeftwristY = results[0].pose.leftWrist.y;
        RightwristY = results[0].pose.rightWrist.y;
        console.log("LeftwristX" + "=" + LeftwristX);
        console.log("RightwristX" + "=" + RightwristX);
        console.log("LeftwristY" + "=" + LeftwristY);
        console.log("RightwristY" + "=" + RightwristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("00FF00");
    stroke("#1F51FF");


if(scoreRightWrist > 0.3) {
    circle(RightwristX, RightwristY, 40);

    if(RightwristY > 0 && RightwristY <= 150)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(RightwristY > 150 &&  RightwristY <= 250) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(RightwristY > 250 &&  RightwristY <= 350) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(RightwristY > 350 &&  RightwristY <= 450) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(RightwristY > 450) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}

if(scoreLeftWrist > 0.3) {
    circle(LeftwristX, LeftwristY, 40);
    InNumberLeftwristY = Number(LeftwristY);
    new_LeftwristY = floor(InNumberLeftwristY * 2);
    LeftwristY_divide_1000 = new_LeftwristY/1000;
    document.getElementById("volume").innerHTML = "Volume = " + LeftwristY_divide_1000;
    song.setVolume(LeftwristY_divide_1000);
}
}



function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
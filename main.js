Status = ""
img = ""
objects = []

function preload() {
    img = loadImage("dog_cat.jpg")
}

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Object Detecting"
}

function modelLoaded() {
    console.log("The model is loaded")
    Status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects = results
    }
}

function draw() {
    image(video, 0, 0, 380, 380)

    if (Status != "") {

        r = random(255)
        g = random(255)
        b = random(255)

        objectDetector.detect(video, gotResult)


        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Object Detected"
            document.getElementById("noo").innerHTML = "Number of Objects: " + objects.length

            fill(r, g, b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 7, objects[i].y + 13)
            noFill()
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }



    /* fill("#ff0000")
    text("cat", 325, 90)
    noFill()
    stroke("#ff0000")
    rect(320,78, 250, 330)*/


}
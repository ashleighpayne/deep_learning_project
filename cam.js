

document.addEventListener('DOMContentLoaded', function () {
    var player = document.getElementById('player');
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');

    var handleSuccess = function (stream) {
        player.srcObject = stream;
    };

    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(handleSuccess)

    var cw = Math.floor(canvas.clientWidth / 10);
    var ch = Math.floor(canvas.clientHeight / 10);
    canvas.width = cw;
    canvas.height = ch;

    player.addEventListener('play', function () {
        draw(this, context, 224, 224);
    }, false);

}, false);

async function draw(v, c, w, h) {
    if (v.paused || v.ended) return false;
    c.drawImage(v, 0, 0, w, h);
    let frame = c.getImageData(0, 0, w, h);
    //console.log(frame);
    let img = tf.browser.fromPixels(frame).resizeNearestNeighbor([224,224]).toFloat();
    const model = await mobilenet.load();
    const prediction = await model.classify(img);
    let prob = prediction[0]["probability"];
    prob = Math.floor(prob * 100);
    let className = prediction[0]["className"];
    console.log(prediction[0]);
    document.getElementById("prediction").textContent = className + " with probability of " + prob + "%";
    c.putImageData(frame, 0, 0);
    setTimeout(draw, 400, v, c, w, h);
}

function countdown() {
    
    var timeleft = 3;
    document.getElementById("countdown").textContent = "Get Ready";
    var downloadTimer = setInterval(function () {
        timeleft--;
        
        if (timeleft == 0) {
            document.getElementById("countdown").textContent = "Finished";
        }
        else {
            document.getElementById("countdown").textContent = "Capturing " + timeleft;
        }
        
        
        
        if (timeleft <= 0)
            clearInterval(downloadTimer);
    }, 1000);

    
    
}

function countdown1(count) {
    document.getElementById("countdown").innerHTML = "Get Ready!" + count;
}


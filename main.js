/*
COPIED FROM THE TUTORIAL
THIS PULLS IMAGES TO SEE IF THE DATA WAS LOADED CORRECTLY
*/

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
import {MnistData} from './data.js';
var model = require('./model.js');

async function showExamples(data) {
  // Create a container in the visor
  const surface =
    tfvis.visor().surface({ name: 'Input Data Examples', tab: 'Input Data'});

  // Get the examples
  const examples = data.nextTestBatch(20);
  const numExamples = examples.xs.shape[0];

  // Create a canvas element to render each example
  for (let i = 0; i < numExamples; i++) {
    const imageTensor = tf.tidy(() => {
      // Reshape the image to 28x28 px
      return examples.xs
        .slice([i, 0], [1, examples.xs.shape[1]])
        .reshape([28, 28, 1]);
    });

    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    canvas.style = 'margin: 4px;';
    await tf.browser.toPixels(imageTensor, canvas);
    surface.drawArea.appendChild(canvas);

    imageTensor.dispose();
  }
}

async function run() {
  const data = new MnistData();
  await data.load();
  await showExamples(data);
  const cnn = model.getModel();
  tfvis.show.modelSummary({name: 'Model Architecture'}, model);
  await model.train(cnn, data);

}

document.addEventListener('DOMContentLoaded', run);

function getFrameData(video, canvas, width, height) {
  if (video.paused || video.ended) return false;
  // Time in milliseconds for interval to take each from from video feed
  let interval = 400;

  canvas.drawImage(video, 0, 0, width, height);

  // extracts the fram data from the video feed
  let frame = canvas.getImageData(0, 0, width, height)

  // Puts the extracted frame onto the webpage, don't need this for final product
  canvas.putImageData(frame, 0, 0);

  // Calls the function again every time interval
  setTimeout(getFrameData, interval, video, canvas, width, height);

}

/*
COPIED FROM THE TUTORIAL
THIS PULLS IMAGES TO SEE IF THE DATA WAS LOADED CORRECTLY
*/

// I need to run set TF_CPP_MIN_LOG_LEVEL=2 in my terminal for it to work

const tf = require('@tensorflow/tfjs');
//require('@tensorflow/tfjs-node');
//import {MnistData} from './data.js';
var model = require('./model.js');
const path = require('path');
const fs = require('fs');
const directoryPathBottom = path.join(__dirname, './hand_photos/bottom');
const directoryPathTop = path.join(__dirname, './hand_photos/top');
const directoryPathLeft = path.join(__dirname, './hand_photos/left');
const directoryPathRight = path.join(__dirname, './hand_photos/right');
const directoryPathMiddle = path.join(__dirname, './hand_photos/middle');
const directoryPathNoHand = path.join(__dirname, './hand_photos/no_hand');


function load_test() {
  //load bottom images
  fs.readdir(directoryPathBottom, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
        //var canvas = document.createElement("canvas");
	      //canvas.width = image.width;
	      //canvas.height = image.height;
	      //canvas.getContext("2d").drawImage(file, 0, 0);

    });
  });

  //load left images
  fs.readdir(directoryPathLeft, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
  });

  //load top images
  fs.readdir(directoryPathTop, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
  });

  //load right images
  fs.readdir(directoryPathRight, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
  });

  //load middle images
  fs.readdir(directoryPathMiddle, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
  });
}

function showExamples(data) {
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
    tf.browser.toPixels(imageTensor, canvas);
    surface.drawArea.appendChild(canvas);

    imageTensor.dispose();
  }
}

function run() {
  //const data = new MnistData();
  //data.load();
  //showExamples(data);
  //const cnn = model.getModel();
  //tfvis.show.modelSummary({name: 'Model Architecture'}, model);
  //model.train(cnn, data);
  load_test();

}

//document.addEventListener('DOMContentLoaded', run);
run();
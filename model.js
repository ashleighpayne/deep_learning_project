const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

/*
Simple test of building a basic convolutional network
*/
function getModel() {

  const model = tf.sequential();

  //The size fo a frame exported in 540p (the lowest in the default windows photo app)
  const IMG_WIDTH = 960
  const IMG_HEIGHT = 540
  //This is the number of frames pulled from the video CAN CHANGE THIS LATER JUST A START
  const FRAMES_PULLED = 9 // 3 Frames with 3 channels each
  const CLASSES = 4 //one for each motion

  model.add(tf.layers.conv2d({
    inputShape: [IMG_WIDTH, IMG_HEIGHT, FRAMES_PULLED],
    kernalSize: 10,
    filters: 2,
    strides: 2,
    activation: 'relu',
    kernalInitializer: 'varianceScaling'
  }));
  //Shape of 476 x 266 x 18

  model.add(tf.layers.pooling2d({
    poolSize: [2,2],
    strides: [2,2]
  }));
  //Shape of 238 x 133 x 18

  model.add(tf.layers.conv2d({
    kernalSize: 24,
    filters: 4,
    strides: 3,
    activation: 'relu',
    kernalInitializer: 'varianceScaling',
    padding: 'same'
  }));

  model.add(tf.layers.pooling2d({
    poolSize: [2,2],
    strides: [2,2]
  }));

  model.add(tf.layers.conv2d({
    kernalSize: 8,
    filters: 2,
    strides: 1,
    activation: 'relu',
    kernalInitializer: 'varianceScaling',
    padding: 'same'
  }));

  model.add(tf.layers.pooling2d({
    poolSize: [2,2],
    strides: [2,2]
  }));

  //Flatten and run through 2 fully connected layers to generate output
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu'
  }));
  model.add(tf.layers.dense({
    units: CLASSES,
    activation: 'softmax'
  }));

  //SGD Training with the parmeter being the learning rate
  const optimizer = tf.train.sgd(.05);
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: 'accuracy'
  });

  return model;
}

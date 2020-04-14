const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

/*
Simple test of building a basic convolutional network
*/
modeule.exports.getModel = function() {

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
};

module.exports.train() = async function(model, data) {

  //Used to plot the results
  const metric = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = {
    name: 'Model Training', styles: {height: '1000px'}
  };
  const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

  //Need to adjust these we will probably have to overfit the data
  const BATCH_SIZE = 1
  const TRAIN_DATA_SIZE = 1
  const TEST_DATA_SIZE = 1

  //Splits data into test and train
  const [trainX, trainY] = tf.tidy(() => {
    const d = data.nextTestBatch(TRAIN_DATA_SIZE);
    return [
      d.xs.reshape([TRAIN_DATA_SIZE, 960, 540, 9]),
      d.labels
    ];
  });

  //Tidy executes a method and deletes all tensors used execpt the final ones
  const [testX, testY] = tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [
      d.xs.reshape([TEST_DATA_SIZE, 960, 540, 9]),
      d.labels
    ];
  });

  return model.fit(trainX, trainY, {
    batchSize: BATCH_SIZE,
    validationData: [testX, testY],
    epochs: 10,
    shuffle: true,
    callbacks: fitCallbacks
  });
};

var fs		= require('fs');
var walk	= require('fs-walk');
var brain	= require('brain.js');
var net		= new brain.NeuralNetwork();


var trainingData = [];

walk.walkSync('./data-test', function(basedir, filename, stat) {
    trainingData = trainingData.concat(require('./data-test/'+filename));
	
	console.log(trainingData.length);

});

var trainResult = net.train(
	trainingData, {
		hiddenLayers: [8, 8, 8, 8],
		errorThresh: 0.005,  // error threshold to reach
		iterations: 1000,   // maximum training iterations
		learningRate: 0.1,    // learning rate
		log: true,
		logPeriod: 10
	}
);

console.log(trainResult);



// Запишем нейросеть в файл
var json = net.toJSON();

fs.writeFile("generated_nn.json", JSON.stringify(json), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("\nThe generated_nn.js was saved!");
});

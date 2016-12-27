var fs		= require('fs');
var walk	= require('fs-walk');
var brain	= require('brain.js');
var net		= new brain.recurrent.LSTM();



var trainingData = [];

walk.walkSync('./data', function(basedir, filename, stat) {
    trainingData = trainingData.concat(require('./data/'+filename));

});

var trainResult = net.train(
	trainingData
);

console.log(trainResult);


// write nn to file
var json = net.toJSON();

fs.writeFile("generated_nn.json", JSON.stringify(json), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("\nThe generated_nn.js was saved!");
});

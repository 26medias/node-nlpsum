var toolbox 	= require('toolbox');
var nlpsum		= require('nlpsum').main;

var sum = new nlpsum();

toolbox.file.read("example.txt", function(content) {
	var summary = sum.fractal(content, 40)
	toolbox.file.write("example-summary.txt", summary);
});
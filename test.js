var toolbox 	= require('toolbox');
var nlpsum		= require('nlpsum').main;
var _ 			= require('underscore');

var sum = new nlpsum();

var sources = ["example-01","example-02","example-03","example-04"];

_.each(sources, function(filename) {
	toolbox.file.read(filename+".txt", function(content) {
		var types = ["fractal","wordFrequency","sinFrequency","sinWordFrequency"];
		_.each(types, function(type) {
			generateSummary(filename, content, type);
		});
	});
})

function generateSummary(filename, content, type) {
	switch (type) {
		default:
		case "fractal":
			var summary = sum.fractalSummary(content, 6);
		break;
		case "wordFrequency":
			var summary = sum.wordFrequencySummary(content, 5);
		break;
		case "sinFrequency":
			var summary = sum.sinFrequencySummary(content, 5);
		break;
		case "sinWordFrequency":
			var summary = sum.sinWordFrequencySummary(content, 5);
		break;
	}
	
	console.log("\n\n-------------- ["+filename+"]["+type+"] --------------");
	console.log(summary.text);
	
	toolbox.file.write("output/"+filename+"-"+type+"-data.json", JSON.stringify(summary, null, 4));
	toolbox.file.write("output/"+filename+"-"+type+"-summary.txt", summary.text);
	toolbox.file.write("output/"+filename+"-"+type+"-tagged.json", JSON.stringify(sum.tag(summary.text), null, 4));
}

var toolbox 	= require('toolbox');
var nlpsum		= require('nlpsum').main;
var _ 			= require('underscore');

var sum = new nlpsum();

toolbox.file.read("example.txt", function(content) {
	//console.log("test",sum.test(content));
	var types = ["fractal","wordFrequency","sinFrequency"];
	_.each(types, function(type) {
		generateSummary(content, type);
	});
});

function generateSummary(content, type) {
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
	}
	
	console.log("\n\n-------------- ["+type+"] --------------");
	console.log(summary.text);
	
	toolbox.file.write("output/"+type+"-data.json", JSON.stringify(summary, null, 4));
	toolbox.file.write("output/"+type+"-summary.txt", summary.text);
	toolbox.file.write("output/"+type+"-tagged.json", JSON.stringify(sum.tag(summary.text), null, 4));
}

var SummaryTool = require('node-summary');
var toolbox 	= require('toolbox');

toolbox.file.read("example.txt", function(content) {
	var title = "Superconductivity in orbit: Scientists find new path to loss-free electricity";
	SummaryTool.summarize(title, content, function(err, summary) {
	    if(err) console.log("Something went wrong man!");
	
	    console.log(summary);
	
	    console.log("Original Length " + (title.length + content.length));
	    console.log("Summary Length " + summary.length);
	    console.log("Summary Ratio: " + (100 - (100 * (summary.length / (title.length + content.length)))));
	});
});



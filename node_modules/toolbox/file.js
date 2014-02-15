var _ 					= require('underscore');
var walk    			= require('walk');
var fs 					= require('fs');


function file() {
	
}

// List file by extention in any subdirectory
file.prototype.listFiles = function(dir, ext, callback, options) {
	
	options = _.extend({
		followLinks: 	false
	},options);
	
	var files   = [];
	
	// Walker options
	var walker  = walk.walk(dir, options);
	
	walker.on('file', function(root, stat, next) {
		var parts = stat.name.split(".");
		if (parts[parts.length-1] == ext) {
			files.push(root + '/' + stat.name);
		}
		next();
	});
	
	walker.on('end', function() {
		callback(files);
	});
}

// List directories
file.prototype.listDirectories = function(dir, callback) {
	var folders = [];
	var opstack = new stack();
	
	fs.readdir(dir, function (err, files) {
		if (err) throw err;
		
		files.forEach( function (file) {
			opstack.add(function(p, cb) {
				fs.lstat(p.dir+'/'+p.file, function(err, stats) {
					if (!err && stats.isDirectory()) {
						folders.push(p.file);
					}
					cb();
				});
			},{dir:dir,file:file});
		});
		
		opstack.process(function() {
			callback(folders);
		}, false);

	});
}

// File to Object
file.prototype.toObject = function(file, callback) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			callback(false);
		} else {
			callback(JSON.parse(data));
		}
	});
}
file.prototype.read = function(file, callback) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			callback(false);
		} else {
			callback(data);
		}
	});
}
file.prototype.append = function(file, content, callback) {
	fs.appendFile(file, content, callback);
}
file.prototype.write = function(file, content, callback) {
	fs.writeFile(file, content, callback);
}
file.prototype.writeJson = function(file, content, callback) {
	fs.writeFile(file, JSON.stringify(content), callback);
}
file.prototype.createPath = function(pathstr, callback) {
	var parts = pathstr.split("/");
	parts = _.compact(parts);
	var pointer = "";
	
	var checkstack = new stack();
	
	_.each(parts, function(part) {
		checkstack.add(function(p, cb) {
			pointer += part+"/";
			fs.exists(pointer, function(exists) {
				if (!exists) {
					fs.mkdir(pointer, 0777, function() {
						cb();
					});
				} else {
					cb();
				}
			});
		},{});
	});
	
	checkstack.process(function() {
		callback();
	}, false);
}
file.prototype.removeDir = function(pathstr, callback) {
	fs.exists(pathstr, function(exists) {
		if (!exists) {
			callback();
		} else {
			var files = [];
			if( fs.existsSync(pathstr) ) {
				files = fs.readdirSync(pathstr);
				files.forEach(function(file,index){
					var curPath = pathstr + "/" + file;
					if(fs.statSync(curPath).isDirectory()) { // recurse
						this.removeDir(curPath);
					} else { // delete file
						fs.unlinkSync(curPath);
					}
				});
				fs.rmdirSync(pathstr);
				callback();
			}
		}
	});

}

exports.main = new file();
var _ 				= require('underscore');

function stack() {
	this.reset();
}
stack.prototype.reset = function() {
	this.stack 		= [];
	this.count 		= 0;
}
stack.prototype.add = function(item, params) {
	this.stack.push({
		fn:		item,
		params:	params
	});
	this.count++;
}
stack.prototype.process = function(callback, async) {
	var scope = this;
	
	if (!async) {
		// synchronous execution
		if (this.stack.length == 0) {
			callback();
			return true;
		}
		this.stack[0].fn(this.stack[0].params,function() {
			scope.stack.shift();
			if (scope.stack.length == 0) {
				callback();
			} else {
				scope.process(callback);
			}
		});
	} else {
		// asynchronous execution
		var i;
		for (i=0;i<this.stack.length;i++) {
			this.stack[i].fn(this.stack[i].params,function() {
				scope.count--;
				if (scope.count == 0) {
					callback();
				}
			});
		}
	}
}

exports.main = stack;
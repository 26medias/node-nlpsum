function ArbiterClass() {
	this.events = new Object();	// events (event based data access and communication)
	this.offers = new Object();	// offers (public-anytime data access)
};
ArbiterClass.prototype.subscribe = function(type, callback) {
	if (this.events[type] == null) {
		this.events[type] = new Array();
	}
	var token = Math.round(Math.random()*100000)+"-"+Math.round(Math.random()*100000);
	this.events[type].push({
		callback: 	callback,
		token:		token
	});
	return token;
};
ArbiterClass.prototype.unsubscribe = function(token) {
	for (var type in this.events) {
		for (var i=0;i<this.events[type].length;i++) {
			if (this.events[type][i].token == token) {
				this.events[type].splice(i,1);
				return true;
			}
		}
	}
	return false;
};
ArbiterClass.prototype.inform = function(type, data) {
	if (this.events[type] != null) {
		for (var i=0;i<this.events[type].length;i++) {
			this.events[type][i].callback(data);
		}
		return this.events[type].length;
	} else {
		return false;
	}
};
ArbiterClass.prototype.offer = function(type, data) {
	if (this.offers[type] == null) {
		this.offers[type] = new Object();
	}
	var token = Math.round(Math.random()*100000)+"-"+Math.round(Math.random()*100000);
	this.offers[type] = {
		data: 		data,
		token:		token
	};
	return token;
};
ArbiterClass.prototype.request = function(type, callback) {
	if (callback != null) {
		callback(this.offers[type].data);
	}
	if (this.offers[type]) {
		return this.offers[type].data;
	}
	return false;
};

exports.main = ArbiterClass;
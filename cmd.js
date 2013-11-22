var map = require("./config/map");

var CommandHandler = function() {

	var _this = this;
	var _public = _this.exports = {};

	_this.init = function() {
		return _public;
	}

	_public.run = function(cmd, params, fn) {

		fn = fn || function(){};

		for(var k in map) {

			var list = map[k].commands;

			for(var i = 0; i < list.length; i++) {

				if(_this.compare(cmd, params, list[i])) {
					_this.start(k, params, fn);
					return;
				}
			}
		}
	}

	_this.start = function(input, params, fn) {

		var cmd = require("./commands/" + input);
		cmd = cmd.init(params, fn);
	}

	_this.compare = function(input, mask) {

		// TODO: regex mask

		if(input == mask) {
			return true;
		}

		return false;
	}

	return _this.init();
}

module.exports = new CommandHandler();
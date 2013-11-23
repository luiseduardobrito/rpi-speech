var map = require("./config/commands");
var speech = require('./speech');

var CommandHandler = function() {

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var _this = this;
	var _public = _this.exports = {};

	_this.init = function() {
		return _public;
	}

	_public.run = function(cmd, params, fn) {

		fn = fn || function(){};

		if(cmd.split(" ").length > 1) {

			var arr = cmd.split(" ");

			cmd = arr.shift();
			params = arr;
		}

		for(var k in map) {

			var list = map[k].commands;

			for(var i = 0; i < list.length; i++) {

				if(_this.compare(cmd, list[i])) {
					_this.start(k, params, fn);
					return;
				}
			}
		}

		speech.display("Comando desconhecido");
	}

	_this.start = function(cmd, params, fn) {

		if(cmd.split(" ").length > 1) {

			var arr = cmd.split(" ");

			cmd = arr.shift();
			params = arr;
		}

		speech.display(cmd.replace(/\w\S*/g, function(txt){
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}) + "\n Iniciando...");

		var cmd = require("./plugins/" + cmd);
		cmd(params, fn);
	}

	_this.compare = function(input, mask) {

		if(input == mask) {
			return true;
		}

		return false;
	}

	return _this.init();
}

module.exports = new CommandHandler();
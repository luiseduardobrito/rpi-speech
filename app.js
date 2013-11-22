#!/usr/bin/env node

var program = require('commander');
var speech 	= require("./speech");
var exec 	= require('child_process').exec;

program
	.version('0.0.1')
	.option('-v, --verbose', 'Verbose mode')
	.parse(process.argv);

var ApplicationHandler = function() {

	 var _this = this;
	 var _public = {};

	 _this.state = false;

	 _this.init = function() {
	 	if(program.verbose)
	 		console.log("Running in verbose mode...");

	 	return _public;
	 }

	 _public.listen = function() {

	 	setInterval(function(){

	 		_this.checkButton(function(buttonState) {

	 			if(!_this.state && buttonState) {

	 				_this.state = true;
	 				_this._listen();
	 			}
	 		})
	 	}, 0.5)
	 }

	 _this.checkButton = function(fn) {
		exec('./scripts/button.sh', function(err, stdout, stderr) {

			if(err)
				throw err;

			else if(!stdout.length) {

				fn(false);
				return;
			}

			else {

				var state = stdout.split('\n')[0];
				state = state[state.length - 1];

				if(state == '0'){
					fn(true);
					return;
				}

				else {
					fn(false);
					return;
				}
			}
		});
	 }

	 _this._listen = function(){

	 	speech.listen(function(txt) {

			_this.state = false;

			if(!txt || !txt.length) {
				console.log("Comando desconhecido");
				speech.display("Comando desconhecido");
			}

			else {

				var result = txt.split('\n')[0]; 

				if(!result || !result.length) {
					console.log("Comando desconhecido");
					return;
				}

				result[0] = result[0].toUpperCase();
				console.log(result);
			}
		});
	 }

	 return _this.init();
}

var app = new ApplicationHandler();
app.listen();

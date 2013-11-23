#!/usr/bin/env node

var program = require('commander');
var exec 	= require('child_process').exec;

var speech 	= require("./speech");
var cmd 	= require("./cmd")

var config 	= require("./config/general");

program
	.version('0.0.1')
	.option('-v, --verbose', 'Verbose mode')
	.option('-u, --unit', 'Unit mode (dev only)')
	.parse(process.argv);

var ApplicationHandler = function() {

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	 var _this = this;
	 var _public = {};

	 _this.unit = false;
	 _this.state = false;

	 _this.init = function() {

	 	if(program.verbose) {

	 		speech.setVerbose(true)
	 		console.log("Running in verbose mode...");
	 	}

	 	if(program.unit) {
	 		_this.unit = true;
	 	}

	 	speech.display("Pronto")

	 	return _public;
	}

	_public.listen = function() {

		if(_this.unit) {
			return _this.recognize();
		}

		else {

			setInterval(function() {

				if(!_this.state) 
					_this.checkButton(function() {
						_this.recognize();
					});

			}, config.button.timeout)
		}
	}

	_this.checkButton = function(fn) {

		fn = fn || function(){};

		exec('./scripts/button.sh', function(err, stdout, stderr) {
			
			var res = stdout || "01";
			res = res.split('\n').length ? res.split('\n')[0] : res;

			if(res == "00" && !_this.state) {

				_this.state = true;
				fn();
			}
		});
	}

	_this.recognize = function() {

	 	speech.listen(function(txt) {

			if(!txt) {
				speech.display("Comando desconhecido");
				_this.state = false;
			}

			else {
				
				cmd.run(txt, {}, function(r) {
					_this.state = false;
					console.log("Response: " + r)
				})
			}
		});
	 }

	 return _this.init();
}

var app = new ApplicationHandler();
app.listen();

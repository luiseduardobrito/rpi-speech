#!/usr/bin/env node

var program = require('commander');
var exec 	= require('child_process').exec;

var speech 	= require("./speech");
var cmd 	= require("./cmd")

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

			}, 500)
		}
	}

	_this.checkButton = function(fn) {

		fn = fn || function(){};

		exec('./scripts/button.sh', function(err, stdout, stderr) {
			
			var res = stdout || "01";
			res = res.split('\n').length ? res.split('\n')[0] : res;

			if(res == "00")
				fn();
		});
	}

	_this.recognize = function() {

		_this.state = true;

	 	speech.listen(function(txt) {

	 		_this.state = false;

			if(!txt) {
				speech.display("Comando desconhecido");
			}

			else {
				
				cmd.run(txt, {}, function(r) {
					console.log("Response: " + r)
				})
			}
		});
	 }

	 return _this.init();
}

var app = new ApplicationHandler();
app.listen();

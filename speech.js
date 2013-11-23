var exec = require('child_process').exec;

var SpeechHandler = function() {

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var _this = this;
	var _public = _this.exports = {};

	_this.verbose = false;

	_this.init = function() {
		return _public;
	}
	
	_public.setVerbose = function(v) {
		_this.verbose = v;
	}

	_public.listen = function(fn) {

		_this.record(function(err, res){

			if(err) 
				console.error(err);

			else {

				if(!res || !res.length) {

					fn(false);
				}

				else {

					res = res.split('\n').length ? res.split('\n')[0] : res; 

					if(!res || !res.length) {

						fn(false)
						return;
					}

					fn(res);
				}
			}
		})
	}

	_this.display = function(msg, fn) {

		fn = fn || function(){};

		// log to terminal screen
		if(_this.verbose)
			console.log(msg);


		if(msg.split("\n").length > 1) {

			var firstLine = msg.split("\n")[0];
			var secondLine = msg.split("\n")[1];

			exec('./scripts/display.sh "'+ firstLine +'"', function(err, stdout, stderr) {
				
				exec('./scripts/advanced/second_line.sh "'+ secondLine +'"', function(err, stdout, stderr) {
					fn();
				});
			});
		}

		else {


			// log to rpi display
			exec('./scripts/display.sh "'+ msg +'"', function(err, stdout, stderr) {
				fn();
			});
		}

	}; _public.display = _this.display;

	_this.record = function(fn) {

		fn = fn || function(){};

		_this.display("Ouvindo...");

		exec('./scripts/record.sh tmp/input.flac',function(err, stdout, stderr) {

			_this.display("Processando...");

			exec('./scripts/recognize.sh tmp/input.flac tmp/input.txt',function(err, stdout, stderr) {
				fn(err, stdout);
			})
		});
	}

	return _this.init();
}

module.exports = new SpeechHandler();

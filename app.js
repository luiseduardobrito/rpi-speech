#!/usr/bin/env node

var program = require('commander');
var exec 	= require('child_process').exec;

var speech 	= require("./speech");
var cmd 	= require("./cmd")

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

	 	speech.listen(function(txt) {

			_this.state = false;

			if(!txt) {
				speech.display("Comando desconhecido");
			}

			else {
				speech.display(txt);
				
				cmd.run(txt, {}, function(r) {
					console.log(r)
				})
			}
		});
	 }

	 return _this.init();
}

var app = new ApplicationHandler();
app.listen();

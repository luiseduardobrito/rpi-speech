var util = require("util");
var exec = require("child_process").exec;

var config = require("../../config/general");
var DEFAULT_BROWSER = config.browser;

module.exports = function(params, fn) {

	if(!params.length) {
		throw new Error("Unknown or invalid browser params");
	}

	else if(typeof params === typeof "") {
		params = [params];
	}

	var paramStr = params.join(" ");
	var browserCommand = util.format(DEFAULT_BROWSER, paramStr);

	exec(browserCommand, function(err, stdout, stderr) {
		fn(err, stdout);
	});
}
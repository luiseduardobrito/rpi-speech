var util = require("util");
var exec = require("child_process").exec;

var DEFAULT_BROWSER = "chromium-browser  --user-data-dir=/tmp/ --kiosk 'https://www.youtube.com/tv?q=%s'";

module.exports = function(params, fn) {

	if(!params.length) {
		throw new Error("Unknown or invalid browser params");
	}

	else if(typeof params === typeof "") {
		params = [params];
	}

	var paramStr = params.join(" ");
	var browserCommand = util.format(DEFAULT_BROWSER, encodeURI(paramStr));

	exec(browserCommand, function(err, stdout, stderr) {
		fn(err, stdout);
	});
}
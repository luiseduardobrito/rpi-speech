var util = require("util");
var exec = require("child_process").exec;

var DEFAULT_BROWSER = "chromium-browser  --user-data-dir=/tmp/ --kiosk 'https://www.google.com.br/search?q=%s'";

module.exports = function(params, fn) {

	if(typeof params === typeof "") {
		params = [params];
	}

	var paramStr = params.join ? params.join(" ") : (params.length ? params : "");
	var browserCommand = util.format(DEFAULT_BROWSER, encodeURI(paramStr));

	exec(browserCommand, function(err, stdout, stderr) {
		fn(err, stdout);
	});
}
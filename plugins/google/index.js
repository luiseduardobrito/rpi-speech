var util = require("util");
var exec = require("child_process").exec;

var config = require("../../config/general");
var DEFAULT_BROWSER = util.format(config.browser, "http://google.com/search?q=%s");

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
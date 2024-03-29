"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _app = _interopRequireDefault(require("./app.js"));
var _cron = require("./services/cron.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app
// ...
.use((0, _cors["default"])()).use((0, _morgan["default"])('dev')).use(_bodyParser["default"].json());
var start = function start() {
  (0, _cron.startJob)();
  (0, _app["default"])(app);
};
start();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _router = _interopRequireDefault(require("./domains/crons/router.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var port = process.env.PORT || 3001;
var App = function App(app) {
  console.log('Mounting server...');
  app.get('/', function (req, res) {
    res.send('hello world');
  });
  app.get('/test', function (req, res) {
    res.status(200).json({
      message: 'Reached...',
      timestamp: Date.now()
    });
  });
  app.use('/api', _router["default"]);
  app.listen(port, function () {
    console.log("Server started at port ".concat(port));
  });
};
var _default = exports["default"] = App;
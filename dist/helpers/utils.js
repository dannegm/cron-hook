"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextRun = exports.getContent = exports.buildUrl = void 0;
var _croner = require("croner");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getNextRun = exports.getNextRun = function getNextRun(_ref) {
  var pattern = _ref.pattern,
    _ref$firstRun = _ref.firstRun,
    firstRun = _ref$firstRun === void 0 ? undefined : _ref$firstRun;
  var cronJob = (0, _croner.Cron)(pattern, {
    startAt: firstRun
  });
  var nextRun = cronJob.nextRun();
  cronJob.stop();
  return nextRun;
};
var buildUrl = exports.buildUrl = function buildUrl(_ref2) {
  var baseUrl = _ref2.baseUrl,
    query = _ref2.query;
  var url = new URL(baseUrl);
  var params = new URLSearchParams(url.search);
  Object.entries(query).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      key = _ref4[0],
      value = _ref4[1];
    params.append(key, value);
  });
  url.search = params.toString();
  return url.href;
};
var getContent = exports.getContent = function getContent() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref5$headers = _ref5.headers,
    headers = _ref5$headers === void 0 ? {} : _ref5$headers,
    _ref5$data = _ref5.data,
    data = _ref5$data === void 0 ? undefined : _ref5$data;
  var headerContentType = (headers === null || headers === void 0 ? void 0 : headers['content-type']) || 'text/plain';
  var _headerContentType$sp = headerContentType.split(';'),
    _headerContentType$sp2 = _slicedToArray(_headerContentType$sp, 1),
    contentType = _headerContentType$sp2[0];
  var content = {
    'application/json': JSON.stringify(data)
  };
  return {
    type: contentType,
    body: content[contentType] || "".concat(data)
  };
};
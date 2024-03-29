"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogSchema = exports.CronSchema = void 0;
var _client = require("@prisma/client");
var prisma = new _client.PrismaClient();
var CronSchema = exports.CronSchema = prisma.cron;
var LogSchema = exports.LogSchema = prisma.log;
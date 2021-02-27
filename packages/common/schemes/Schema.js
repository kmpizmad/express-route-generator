"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var chalk_2 = require("../vendors/chalk");
var Schema = (function () {
    function Schema(name, schema) {
        this._name = name;
        this._schema = schema;
    }
    Schema.prototype.build = function (path, extension) {
        if (!fs_1.existsSync(path)) {
            fs_1.mkdirSync(path, { recursive: true });
        }
        var file = path_1.join(path, this._name) + extension;
        fs_1.writeFile(file, this._schema, chalk_2.Chalk.log(chalk_1.green, "created " + file));
    };
    return Schema;
}());
exports.Schema = Schema;

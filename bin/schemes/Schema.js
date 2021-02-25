"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("../errors");
var chalk_2 = require("../vendors/chalk");
var Schema = (function () {
    function Schema(name, schema) {
        this._name = name;
        this._schema = schema;
    }
    Schema.prototype.build = function (path, extension) {
        try {
            if (!fs_1.existsSync(path)) {
                fs_1.mkdirSync(path, { recursive: true });
            }
            var file_1 = path_1.join(path, this._name) + extension;
            fs_1.writeFile(file_1, this._schema, function () {
                return chalk_2.Chalk.writeLine(chalk_1.green, "created " + file_1);
            });
        }
        catch (error) {
            var exception = new errors_1.FileNotFoundException(error.message);
            exception.throw();
        }
    };
    return Schema;
}());
exports.Schema = Schema;

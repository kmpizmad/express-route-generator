"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var schemes_1 = require("../common/schemes");
var vendors_1 = require("../common/vendors");
function default_1(config) {
    var routesFolder = path_1.normalize(config.rootDir);
    var extension = config.language === 'typescript' ? '.ts' : '.js';
    if (!fs_1.existsSync(routesFolder)) {
        fs_1.mkdirSync(routesFolder, { recursive: true });
    }
    config.routes.forEach(function (route) {
        var hasSchemes = route.schemes && route.schemes.length > 0;
        var hasMethods = route.methods && Object.getOwnPropertyNames(route.methods).length > 0;
        if (hasSchemes) {
            var path_2 = path_1.join(routesFolder, route.name);
            if (!fs_1.existsSync(path_2)) {
                fs_1.mkdirSync(path_2, { recursive: true });
            }
            route.schemes.forEach(function (schema) {
                var file = path_1.join(path_2, schema.name + extension);
                fs_1.writeFile(file, schema.text, vendors_1.Chalk.log(chalk_1.green, "created " + path_2));
            });
        }
        else if (hasMethods) {
            var methods = Object.getOwnPropertyNames(route.methods).filter(function (method) { return route.methods[method]; });
            schemes_1.SchemaBuilder.defaultBuild({
                path: routesFolder,
                extension: extension,
                filename: route.name,
                methods: methods,
                test: route.test || true,
            });
        }
        else {
        }
    });
}
exports.default = default_1;

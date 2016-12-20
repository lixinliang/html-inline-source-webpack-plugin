'use strict';

var fs = require('fs');
var path = require('path');
var inlineSource = require('inline-source');

function readdir ( directory, callback ) {
    var result = [];
    if (fs.existsSync(directory)) {
        var files = fs.readdirSync(directory);
        files.forEach(function ( file ) {
            var filepath = path.join(directory, file);
            var stats = fs.statSync(filepath);
            if (stats.isFile()) {
                result.push(file);
            }
            if (stats.isDirectory()) {
                readdir(filepath).forEach(function ( filename ) {
                    result.push(path.join(file, filename));
                });
            }
        });
    }
    return result;
}

function inline ( file, option ) {
    fs.writeFileSync(file, inlineSource.sync(file, option));
}

function HtmlInlineSourceWebpackPlugin ( configs, callback ) {
    if (!(this instanceof HtmlInlineSourceWebpackPlugin)) {
        throw 'Cannot call HtmlInlineSourceWebpackPlugin as a function.';
    }
    if (typeof configs == 'function') {
        callback = configs;
        configs = {};
    }
    if (typeof configs != 'object') {
        configs = {};
    }
    if (configs instanceof Array) {
        this.configs = configs;
    } else {
        this.configs = [configs];
    }
    if (typeof callback == 'function') {
        this.callback = callback;
    } else {
        this.callback = function () {};
    }
}

HtmlInlineSourceWebpackPlugin.prototype.apply = function ( compiler ) {
    var configs = this.configs;
    var length = configs.length;
    var callback = this.callback;
    compiler.plugin('done', function ( stats ) {
        var compiler = stats.compilation.compiler;
        var outputPath = path.join(compiler.context, compiler.outputPath);
        var defaults = {
            compress : false,
            rootpath : outputPath,
            handlers : function ( source, context ) {
                if (source && source.fileContent && !source.content) {
                    if (source.extension == 'css') {
                        source.tag = 'style';
                        source.content = source.fileContent.replace(/url\(.*?\)/g, function ( match ) {
                            var url = match.slice(4, -1);
                            if (/^http(s?):\/\/|^data:image/.test(url)) {
                                return match;
                            } else {
                                if (url.indexOf('?')) {
                                    url = url.split('?')[0];
                                }
                                return 'url(' + path.join(path.relative(outputPath, source.filepath), url) + ')';
                            }
                        });
                    }
                    if (source.extension == 'js') {
                        source.content = source.fileContent.trim();
                    }
                }
            },
        };
        readdir(outputPath).forEach(function ( filename ) {
            if (/\.html$/.test(filename)) {
                for (var i = 0; i < length; i++) {
                    var config = configs[i];
                    if (config.test instanceof RegExp) {
                        if (config.test.test(filename)) {
                            return inline(
                                path.join(outputPath, filename),
                                config.option || defaults
                            );
                        }
                    } else {
                        return inline(
                            path.join(outputPath, filename),
                            config.option || defaults
                        );
                    }
                }
            }
        });
        callback();
    });
};

module.exports = HtmlInlineSourceWebpackPlugin;

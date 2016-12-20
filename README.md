[![npm](https://img.shields.io/npm/l/html-inline-source-webpack-plugin.svg?style=flat-square)](https://www.npmjs.org/package/html-inline-source-webpack-plugin)
[![npm](https://img.shields.io/npm/v/html-inline-source-webpack-plugin.svg?style=flat-square)](https://www.npmjs.org/package/html-inline-source-webpack-plugin)
[![npm](https://img.shields.io/npm/dm/html-inline-source-webpack-plugin.svg?style=flat-square)](https://www.npmjs.org/package/html-inline-source-webpack-plugin)
[![bitHound Overall Score](https://www.bithound.io/github/lixinliang/html-inline-source-webpack-plugin/badges/score.svg)](https://www.bithound.io/github/lixinliang/html-inline-source-webpack-plugin)
[![bitHound Dependencies](https://www.bithound.io/github/lixinliang/html-inline-source-webpack-plugin/badges/dependencies.svg)](https://www.bithound.io/github/lixinliang/html-inline-source-webpack-plugin/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/lixinliang/html-inline-source-webpack-plugin/badges/code.svg)](https://www.bithound.io/github/lixinliang/html-inline-source-webpack-plugin)


# html-inline-source-webpack-plugin

> 🔧A webpack plugin to inline source in html, wrapper of inline-source.

### Env

* Node - v4.7.0
* npm - 2.15.11
* webpack - ^1.14.0

## Install

```shell
$ npm install html-inline-source-webpack-plugin --save-dev
```

## Usage

#### webpack.config.js

```js
// webpack.config.js
let HtmlInlineSourceWebpackPlugin = require('html-inline-source-webpack-plugin');

module.exports = {
    /* Your config */
    plugins : [
        /* ... */
        new HtmlInlineSourceWebpackPlugin(),
    ],
};
```

#### index.html
```
<!DOCTYPE html>
<html>
<head>
    <title> index </title>
    <link inline href="css/index.css" rel="stylesheet">
</head>
<body>
    <script inline src="js/index.js" charset="utf-8"></script>
</body>
</html>
```

## Notice

```
<script inline src="js/index.js" charset="utf-8"></script>
```

* Use `inline` attribute to inline source;
* Ensure `src` or `href` is linked to a correct file.

## Options

#### Default option

```js
new HtmlInlineSourceWebpackPlugin()
```

#### Custom option

This option would apply to all files.

```js
new HtmlInlineSourceWebpackPlugin({
    option : {
        compress : false,
        rootpath : path.resolve('./dist'),
    },
})
```

#### Custom option for different file

Use `test` to let different option apply to different files.

```js
new HtmlInlineSourceWebpackPlugin([
    {
        test : /\bindex\.html$/,
        option : {
            ignore : 'script',
            rootpath : path.resolve('./dist'),
        },
    },
    {
        test : /\bexample\.html$/,
        option : {
            ignore : 'css',
            rootpath : path.resolve('./dist'),
        },
    },
    {
        /* This option would apply to the rest files */
        option : {
            ignore : ['script', 'css'],
            rootpath : path.resolve('./dist'),
        },
    },
])
```

#### More option

see [here](https://github.com/popeindustries/inline-source#usage).

#### Callback

```js
new HtmlInlineSourceWebpackPlugin(function () {
    console.log('inline source done!');
})
/* or */
new HtmlInlineSourceWebpackPlugin({
    /* option */
}, function () {
    console.log('inline source done!');
})
```

## Related

* [inline-source](https://www.npmjs.com/package/inline-source)
    * A plugin to inline source in html. You have to inline source after webpack manually.
* [html-webpack-inline-source-plugin](https://www.npmjs.com/package/html-webpack-inline-source-plugin)
    * Depends `html-webpack-plugin`, only inline source in `head` or `body`.
* [html-inject-webpack-plugin](https://www.npmjs.com/package/html-inject-webpack-plugin)
    * You have to define flag name in html. Only inline source which is in your `src` directory.
* [inline-resource-plugin](https://www.npmjs.com/package/inline-resource-plugin)
    * Only inline source which is in your `src` directory.

## License

MIT

# QingDialog

[![Latest Version](https://img.shields.io/npm/v/qing-dialog.svg)](https://www.npmjs.com/package/qing-dialog)
[![Build Status](https://img.shields.io/travis/mycolorway/qing-dialog.svg)](https://travis-ci.org/mycolorway/qing-dialog)
[![Coveralls](https://img.shields.io/coveralls/mycolorway/qing-dialog.svg)](https://coveralls.io/github/mycolorway/qing-dialog)
[![David](https://img.shields.io/david/mycolorway/qing-dialog.svg)](https://david-dm.org/mycolorway/qing-dialog)
[![David](https://img.shields.io/david/dev/mycolorway/qing-dialog.svg)](https://david-dm.org/mycolorway/qing-dialog#info=devDependencies)

QingDialog is a ui component inherited from QingModule.

## Usage

```html
<script type="text/javascript" src="node_modules/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="node_modules/qing-module/dist/qing-module.js"></script>
<script type="text/javascript" src="node_modules/qing-dialog/dist/qing-dialog.js"></script>
```

```js
var dialog = new QingDialog({
  content: 'dialog content here'
});

dialog.on('remove', function(e) {
  // do something
});
```

## Options

__content__

Selector/Element/jQuery Object, required, specify the dialog content.

__width__

Number, 600 by default.

__backdrop__

Boolean, true by default.

__fullscreen__

Boolean, false by default.

__cls__

String, extra class names for the dialog div.

## Class Methods

__removeAll__ ()

Destroy all dialogs.

## Instance Methods

__setContent__ (content)

Set the dialog's content.

__remove__ ()

Destroy the dialog.

## Events

__remove__

Triggered after removed.

## Installation

Install via npm:

```bash
npm install --save qing-dialog
```

## Development

Clone repository from github:

```bash
git clone https://github.com/mycolorway/qing-dialog.git
```

Install npm dependencies:

```bash
npm install
```

Run default gulp task to build project, which will compile source files, run test and watch file changes for you:

```bash
gulp
```

Now, you are ready to go.

## Publish

When you want to publish new version to npm and bower, please make sure all tests have passed, and you need to do these preparations:

* Add release information in `CHANGELOG.md`. The format of markdown contents will matter, because build scripts will get version and release content from the markdown file by regular expression. You can follow the format of the older releases.

* Put your [personal API tokens](https://github.com/blog/1509-personal-api-tokens) in `/.token.json`(listed in `.gitignore`), which is required by the build scripts to request [Github API](https://developer.github.com/v3/) for creating new release:

```json
{
  "github": "[your github personal access token]"
}
```

Now you can run `gulp publish` task, which will do these work for you:

* Get version number from `CHANGELOG.md` and bump it into `package.json` and `bower.json`.
* Get release information from `CHANGELOG.md` and request Github API to create new release.

If everything goes fine, you can see your release at [https://github.com/mycolorway/qing-module/releases](https://github.com/mycolorway/qing-module/releases). At the End you can publish new version to npm with the command:

```bash
npm publish
```

Please be careful with the last step, because you cannot delete or republish a version on npm.

# FRAME LUNCH scaffold for frontend development

## Requierment

* macOS: >= 10.12
    * or Ubuntu 16.04
* Node: >= v6.9

## Important Technology

### Node.js manager

* [ndenv](https://github.com/riywo/ndenv)

### Package manager

* [yarn (recommend)](https://yarnpkg.com/)
* [npm](https://www.npmjs.com/)

### Task runner

* [Gulp](http://gulpjs.com/)

### Build tools

#### JavaScript

* [Webpack](https://webpack.github.io/)
* [babel](https://babeljs.io/)
    * [babel-preset-flow](https://github.com/babel/babel/tree/master/packages/babel-preset-flow)
    * [babel-preset-env](https://github.com/babel/babel-preset-env)
    * [babel-plugin-transform-object-rest-spread](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-rest-spread)

※JSで扱うimgはimportを用いてinline化する

#### CSS

* [PostCSS](http://postcss.org/)
    * [autoprefixer](https://github.com/postcss/autoprefixer)
    * [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)
    * [postcss-fixes](https://github.com/mattdimu/postcss-fixes)

* [ECSS](http://ecss.io/)

※CSSでのurl指定はinline化される。

#### html

* [EJS](http://www.embeddedjs.com/)

### Code checker

#### JavaScript

* [flow](https://flow.org/)
* [ESLint](http://eslint.org/)
    * [eslint-config-framelunch](https://github.com/framelunch/eslint-config-framelunch)

#### CSS

* [stylelint](https://stylelint.io/)
    * [stylelint-config-framelunch](https://github.com/framelunch/stylelint-config-framelunch)

## Directory Layout
```text
.
|- /build/                  # yarn run buildコマンドで生成されるコンパイル済みファイル
|- /src
|    |- /assets/            # フロントエンドに必要な静的リソース
|    |- /components/        # WEBコンポーネント
|    |- /libs/              # Javascriptのライブラリ
|    |- /modules/           # ページの主要なパーツを構成するモジュール
|    |- /scripts/           # Javascriptのエントリーディレクトリ
|    |- /styles/            # CSSのエントリーディレクトリ
|    |- /views/             # EJSのエントリーディレクトリ
|- /node_modules/           # 3rd-party libraries and utilities for nodeJs
|- /tools/                  # ビルドツール関連
|    |- /gulp/              # gulpタスクを記述したjs。タスクごとに1ファイルとする
|    |- /webpack/           # webpackビルド設定
|    |- /config.js          # ビルド関係設定ファイル
|- .babelrc                 # babel設定ファイル(gulp, webpackの設定ファイル用)
|- .eslintignore            # eslintから除外するファイル
|- .eslintrc                # eslint設定ファイル
|- .gitignore               # git管理対象外を記述
|- .node-version            # ndenv用のバージョン指定
|- .stylelintrc             # stylelint設定ファイル
|- gulpfile.babel.js        # gulp実行ファイル
|- package.json             # The list of 3rd party libraries for nodeJs
|- README.md                # README
|- yarn.lock                # yarn用利用npmsバージョン管理ファイル
```
## Settings
- ProjectのSettingでsrcディレクトリをrootに設定する
- assetは必ず絶対パスで記述する

<p align="center">
  <a href="http://source.unclay.com/dme/1.1.0/index.html" target="_blank">
    <img src="https://raw.githubusercontent.com/unclay/dme-cli/master/logo.png" width="100">
  </a>
</p>
<p align="center">
  <a href="https://circleci.com/gh/unclay/dme-cli"><img src="https://img.shields.io/circleci/project/unclay/dme-cli/master.svg" alt="CircleCI branch"></a>
  <a href="https://www.npmjs.com/package/dme-cli"><img src="https://img.shields.io/npm/v/dme-cli.svg" alt="npm package"></a>
  <br>
</p>
<p align="center">仿造spmjs搭建的一个组件开发引擎，基于webpack＋vue＋less＋es6来构建的</p>
<p align="center">支持自己定制模版，初始化自己的模版，以上只是内置的模版</p>

# demo

+ <a href="http://source.unclay.com/dme/1.1.0/index.html" target="_blank">dem-demos@1.1.0</a>
+ <a href="https://github.com/unclay/dme-demos" target="_blank">dem-demos@1.1.0源码</a>

# Installation

``` bash
$ npm install -g dme-cli
```

# Usage

``` bash
$ dme init <project-name>
```

# Quick start

``` bash
# init a project with dme-template
dme init my-project
cd my-project

# or cnpm install
npm install
npm run dev
```

# Use more template

```bash
# origin template
dme init my-project BozhongFE/xxx-template

# local template(dev new template)
dme init my-project /code/xxx-template
```

# Template
下载安装的模板地址: <a href="https://github.com/unclay/dme-template" target="_blank">dme-template</a>

# History

|版本号|变更内容|
|----|----|
|0.0.4|新增模版参数，支持远程git模版、本地模版（便于开发新模版）,<br/>Buffer()弃用换新方法，更新依赖库，单元测试待定

# d-tree-form

[![Build Status](https://travis-ci.org/deepexi/d-tree-form.svg?branch=master)](https://travis-ci.com/deepexi/d-tree-form)
[![NPM Download](https://badgen.net/npm/dm/d-tree-form)](https://www.npmjs.com/package/d-tree-form)
[![NPM Version](https://badgen.net/npm/v/d-tree-form)](https://www.npmjs.com/package/d-tree-form)
[![NPM License](https://badgen.net/npm/license/d-tree-form)](https://github.com/deepexi/d-tree-form/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/deepexi/d-tree-form/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

short description + sample image(png/gif/mp4)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Links](#links)
- [Install](#install)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

一个通过脚手架参数转化成树形动态表单的组件

[⬆ Back to Top](#table-of-contents)

## Features

1. 目前支持 input，textarea，select 三种表单项
2. type=select 时支持多层子节点
3. 目前仅支持 required 的校验规则

## Data Structure

### Demo

![image.png](https://cdn.nlark.com/yuque/0/2019/png/429733/1567481126689-a575b68f-111b-4701-882c-bd2d75497eb0.png#align=left&display=inline&height=387&name=image.png&originHeight=774&originWidth=1566&size=79700&status=done&width=783)

```javascript
[
  {
    label: '作者',
    type: 'input',
    prop: 'author',
    value: '',
    tooltips: 'xxx',
    componentProps: {
      placeholder: '请输入内容',
    },
    rules: [{required: true, message: '这是必填'}],
  },
  {
    label: '路由',
    type: 'select',
    prop: 'router',
    value: '',
    options: [
      {
        label: 'mongo',
        value: 'mongo',
      },
      {
        label: 'mysql',
        value: 'mysql',
      },
      {
        label: 'none',
        value: 'none',
      },
    ],
  },

  {
    label: '配置中心',
    type: 'select',
    prop: 'configCenter',
    value: '',
    options: [
      {
        label: 'apollo',
        value: 'apollo',
      },
      {
        label: 'none',
        value: 'none',
      },
    ],
  },
  {
    label: 'APM',
    type: 'select',
    prop: 'apm',
    value: '',
    options: [
      {
        label: 'skywalking',
        value: 'skywalking',
        childNodes: [
          {
            label: 'skywalking Servers地址：',
            type: 'input',
            prop: 'skywalkingServers',
            value: '',
            labelWidth: '200px',
            rules: [
              {required: true, message: '请输入skywalking Servers地址'},
            ],
          },
          {
            label: 'skywalking Servers地址2：',
            type: 'input',
            prop: 'skywalkingServers2',
            value: '',
            labelWidth: '200px',
            rules: [
              {required: true, message: '请输入skywalking Servers地址'},
            ],
          },
        ]
      },
      {
        label: 'none',
        value: 'none',
      }
    ],
  },
],
```

### form-item props

| 参数           | 类型                            | 说明                         | 必须 | 默认值   | 备注                                        |
| -------------- | ------------------------------- | ---------------------------- | ---- | -------- | ------------------------------------------- |
| label          | String                          | 字段中文名                   | 是   | -        | -                                           |
| prop           | String                          | 字段的 key，必须唯一         | 是   | -        | -                                           |
| value          | String<br />Number<br />Boolean | 字段的值                     | 是   | 空字符串 | -                                           |
| type           | String                          | 该表单项的类型               | 是   |          | 仅支持<br />input<br />select<br />textarea |
| labelWidth     | String                          | 字段中文名的宽度             | 否   |          |                                             |
| tooltips       | String                          | 问号提示语                   | 否   |          |                                             |
| rules          | Array                           | 校验规则，详看下面           | 否   |          |                                             |
| options        | Array                           | 下拉框选项，详看下面         |      |          | type="select"时必填                         |
| componentProps | Object                          | 传给表单的属性对象，详看下面 | 否   |          |                                             |
| children       | Array                           | 子节点                       |      |          | 每一项和 formitem 属性一致                  |

#### select options

| 参数       | 类型                            | 说明                   | 必须 | 默认值 | 备注                                                                           |
| ---------- | ------------------------------- | ---------------------- | ---- | ------ | ------------------------------------------------------------------------------ |
| label      | String                          | 下拉选项的显示值       | 是   | -      | -                                                                              |
| value      | String<br />Number<br />Boolean | 下拉选项的用于提交的值 | 是   |        |                                                                                |
| childNodes | Array                           | 该 option 子节点       | 否   |        | 选中该 option 需要子节点时使用，数组的项为 form-item，不支持子节点下还有子节点 |

#### rules

支持 Element-ui Form 的校验规则，不支持函数校验<br />参考：[https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng](https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng)<br />基本用法：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/429733/1567501910208-16bad7ec-fcf6-4404-a17e-044ee662b5e4.png#align=left&display=inline&height=491&name=image.png&originHeight=982&originWidth=1360&size=170441&status=done&width=680)<br />常用字段

| 参数     | 类型    | 说明             | 必须 | 默认值 | 备注                                                                                                                                                                                                                                        |
| -------- | ------- | ---------------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | String  | 校验的类型       | 否   | string | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/429733/1567502342718-fe739aa9-9e2f-4b32-bbdd-81c0e75b9afc.png#align=left&display=inline&height=517&name=image.png&originHeight=1034&originWidth=1754&size=230324&status=done&width=877) |
| required | Boolean | 是否必填         | 否   | false  | true 是在表单项前面会有一个星                                                                                                                                                                                                               |
| message  | String  | 校验不通过提示语 | 是   | -      |                                                                                                                                                                                                                                             |
| pattern  | String  | 校验正则         | 否   | -      | 正则校验使用字符串形式，因为 JSON 中不支持存储正则表达式类型                                                                                                                                                                                |
| trigger  | String  | 验证触发方式     | 否   | change | blur 失去焦点时<br />change 改变值时                                                                                                                                                                                                        |
| min      | Number  | 最小长度         | 否   |        |                                                                                                                                                                                                                                             |
| max      | Number  | 最大长度         | 否   |        |                                                                                                                                                                                                                                             |
| len      | Number  | 最大长度         | 否   |        | 如果 len 属性与最小和最大范围属性组合，则 len 优先。                                                                                                                                                                                        |
| ...      |         |                  |      |        |                                                                                                                                                                                                                                             |

> 更多高级用法  [https://github.com/yiminghe/async-validator](https://github.com/yiminghe/async-validator)

[⬆ Back to Top](#table-of-contents)

## Links

- [docs](https://deepexi.github.io/d-tree-form/)

[⬆ Back to Top](#table-of-contents)

## Install

[⬆ Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

Please refer to our [contributing guide](https://github.com/FEMessage/.github/blob/master/CONTRIBUTING.md).

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<table>
<tr>
  <td align="center"><a href="https://github.com/DeepenLau"><img src="https://avatars3.githubusercontent.com/u/14030995?s=460&v=4" width="100px;" alt="DeepenLau"/><br /><sub><b>DeepenLau</b></sub></a></td>
 </tr></table>
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)

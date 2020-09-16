# 前端单元测试和集成测试


## 测试用例

为某个特殊目标而编制的一组测试输入、执行条件以及预期结果，用于核实是否满足某个特定软件需求

断言：经过某个操作后，期待得到一个结果

## 语言自带的断言功能

```
const getNameFromDockerImage = (image) => {
  if (!image) return '';
  return image.replace(/(.+\/)/, '');
}

console.assert(getNameFromDockerImage('harbor.sigsus.cn:8443/sz_gongdianju/apulistech/node:12') === 'node:12')

```

## 使用 jest 做单元测试

初始化前端开发环境
```
yarn add create-react-app --global
create-react-app .
```

下载、初始化 jest
```
yarn add --dev jest
npx jest --init
```

下载常用 UI 库
```
yarn add antd
```

## 一、基础 api 使用 https://jestjs.io/docs/en/expect
```
// 1.test.js

describe('第一个测试套件', () => {

  test('true', () => {
    expect(1 + 1 === 2).toBe(true)
  })

  test('加法', () => {
    expect(1 + 1).toEqual(2)
  })
  
  test('测试数组包含', () => {
    expect([1, 2, 3, 4]).toEqual(expect.arrayContaining([3, 1]))
  })
  
  test('测试数组不包含', () => {
    expect([1, 2, 3, 4]).not.toEqual(expect.arrayContaining([3, 6]))
  })
})

```

## 从项目中引入函数进行测试
由于 jest 是 nodejs 的一个库，默认使用 commonjs 规范，所以测试前端项目时，还需要使用一些工具进行转换
配置 babel， babel.config.js
```
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
};
```
然后使用 yarn 安装这三个包，安装后，测试项目内的函数
```
import { getNameFromDockerImage } from '../src/util'


describe('getNameFromDockerImage', () => {
  test('getNameFromDockerImage 1', () => {
    expect(getNameFromDockerImage('harbor.sigsus.cn:8443/sz_gongdianju/apulistech/node:12')).toEqual('node:12')
  })
})
```

## 测试 ui 组件
我们使用了 react，所以也会使用 react 提供的工具库进行测试，像 Vue，Angular 也提供了相应的测试库

这些测试库可以模拟组件在浏览器中的表现，并且提供相关 API 给使用者进行测试

相关文档：
https://testing-library.com/docs/react-testing-library/api
事件：https://github.com/testing-library/user-event

测试用例示例：https://react-testing-examples.com/jest-rtl/
安装依赖库
```
yarn add @testing-library/jest-dom @testing-library/react --dev
```

写一个用于测试的组件, src/components/MyButton.jsx
```
import React, { useState } from 'react'
import { Button } from 'antd'

const MyButton = ({ children, onClick }) => {
  const [count, setCount] = useState(0)
  const disabled = count >=5
  const handleClick = () => {
    const newCount = count + 1
    setCount(newCount)
    if (!disabled) {
      onClick && onClick()
    }
  }
  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      type="primary"
    >{children}--YT</Button>
  )
}

export default MyButton
```
修改 jest 配置，增加
```
...
setupFilesAfterEnv: [
  "<rootDir>/src/setupTests.js"
]
```

编写测试用例, 3.test.js
```
import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import MyButton from '../src/component/MyButton'

describe('my button', () => {
  
  test('could receive text as child', () => {
    const testMessage = 'Test Message'
    render(<MyButton>{testMessage}</MyButton>)
    expect(screen.getByText(testMessage + '--YT')).toBeInTheDocument()
  })

  test('can fire click event', () => {
    const onClick = jest.fn()
    render(<MyButton onClick={onClick}>test</MyButton>)
    
    for (let i = 0; i < 10; i ++) {
      fireEvent.click(screen.getByText('test' + '--YT'))
    }
    expect(onClick.mock.calls.length).toBe(5)
  })

})
```

可以生成测试覆盖率文档
在 package.json 中，修改 script `"test": "jest --config=jest.config.js --coverage"`
```
yarn add jest-config --dev
```

```
const { defaults } = require('jest-config');

module.exports = {
  coverageDirectory: 'reports/coverage',
  coverageReporters: ['lcov'],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'ts',
    'tsx',
    'jsx'
  ],
  reporters: [
    'default',
  ],
  testMatch: [
    '**/tests/**/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/mocks/*',
  ],
  automock: false,
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js"
  ],
  coverageProvider: "v8",
};
```




[![Build Status](https://api.travis-ci.org/xianjiezh/unit-test.svg?branch=master)](https://travis-ci.org/xianjiezh/unit-test)

## 相关依赖库
jest dom[https://github.com/testing-library/jest-dom]


jest 配置
jest.config.js
```
module.exports = {
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.js"
  ]
}
```

## 持续集成
1. 了解 travis ci
https://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html
2. 支持的语言
https://docs.travis-ci.com/user/languages

配置 travis
.travis.yml
```
language: node_js
node_js:
  - "12"
sudo: required
```

## 使用 puppeteer 测试业务

https://github.com/xianjiezh/demo-puppeteer

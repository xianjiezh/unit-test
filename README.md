# 前端单元测试和集成测试
test-----------

## 测试用例




## 自带的断言功能




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

react-testing-library/api[https://testing-library.com/docs/react-testing-library/api]

测试事件  https://github.com/testing-library/user-event

travis 文档 https://docs.travis-ci.com/user/languages

测试例子：https://react-testing-examples.com/jest-rtl/
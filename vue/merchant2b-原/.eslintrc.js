// https://eslint.org/docs/user-guide/configuring

module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  //ecmaVersion用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  parserOptions: {
    "ecmaVersion": 6, //指定ECMAScript支持的版本，6为ES6
    "sourceType": "module", //指定来源的类型，有两种”script”或”module”
    // "ecmaFeatures": {  // react
    //   "jsx": true//启动JSX
    // },
    parser: 'babel-eslint'  //EsLint默认使用esprima做脚本解析，当然你也切换他，比如切换成babel-eslint解析
  },

  //此项指定环境的全局变量， Environment可以预设好的其他环境的全局变量，如brower、node环境变量、es6环境变量、mocha环境变量等
  // 下面的配置指定为浏览器环境  node es6
  env: {
    browser: true,
    node: true,
    es6:true,
    commonjs: true,
    amd: true
  },
  //指定你所要使用的全局变量，true代表允许重写、false代表不允许重写
  globals: {
    "wx": true                                 //zepto jquery
  },
  // 是EsLint默认推荐的验证，你可以使用配置选择哪些校验是你所需要的，可以登录npmjs.com查看
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',  // vue
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'   // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
  ],
  // required to lint *.vue files
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-
  plugins: [
    'vue',  //下面这个配置是用来规范vue的
  ],


  // add your custom rules here
  //自定义规则，一般格式：”规则名称”:error级别系数。系数0为不提示(off)、1为警告(warn)、2为错误抛出(error)，可指定范围，如[1,4]
  //默认校验的地址http://eslint.org/docs/rules/
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',





    //警告
    "quotes": ["off", "single"],            //建议使用单引号
    // "no-inner-declarations": [1, "both"],     //不建议在{}代码块内部声明变量或函数
    "no-extra-boolean-cast": 1,               //多余的感叹号转布尔型
    "no-extra-semi": 1,                       //多余的分号
    'semi': ['off', 'always'],                // js语句结尾必须使用分号
    "no-extra-parens": 1,                     //多余的括号
    "no-empty": 1,                            //空代码块
    "no-use-before-define": [1, "nofunc"],    //使用前未定义
    "complexity": [1, 30],                    //圈复杂度大于20 警告
    "no-tabs":"off",                          //Unexpected tab character



    //常见错误
    "comma-dangle": [0, "never"],             //定义数组或对象最后多余的逗号
    // "no-debugger": 2,                         //debugger 调试代码未删除
    "no-constant-condition": 2,               //常量作为条件
    "no-dupe-args": 2,                        //参数重复
    "no-dupe-keys": 2,                        //对象属性重复
    "no-duplicate-case": 2,                   //case重复
    "no-empty-character-class": 2,            //正则无法匹配任何值
    "no-invalid-regexp": 2,                   //无效的正则
    "no-func-assign": 2,                      //函数被赋值
    "valid-typeof": 2,                        //无效的类型判断
    "no-unreachable": 2,                      //不可能执行到的代码
    "no-unexpected-multiline": 1,             //行尾缺少分号可能导致一些意外情况
    "no-sparse-arrays": 2,                    //数组中多出逗号
    "no-shadow-restricted-names": 2,          //关键词与命名冲突
    "no-undef": 2,                            //变量未定义
    "no-unused-vars": 1,                      //变量定义后未使用
    "no-cond-assign": 2,                      //条件语句中禁止赋值操作
    "no-native-reassign": 2,                  //禁止覆盖原生对象
    "no-regex-spaces": 2,                     //禁止在正则表达式字面量中使用多个空格 /foo bar/

    //代码风格优化
    "keyword-spacing": [0, {"before": true, "after": true, "overrides": null}],
    "no-trailing-spaces": [0, { "ignoreComments": true }],
    'space-infix-ops':0,                      //赋值不加空格
    "ignoreComments": true,                   //注释代码不检查
    "spaced-comment": [0, "always"],          //注释空格
    "padded-blocks":[0, "always"],            //{}后面空格
    "no-else-return": 1,                      //在else代码块中return，else是多余的
    "no-multi-spaces": 0,                     //不允许多个空格
    "key-spacing": [0, {"beforeColon": false, "afterColon": true}],//object直接量建议写法 : 后一个空格签名不留空格
    "no-mixed-spaces-and-tabs": [1, false],   //禁止混用tab和空格
    "no-irregular-whitespace": 1,             //不能有不规则的空格
    'indent': [ 0, 4 ],                       //缩进风格
    'space-before-function-paren': 0,         // 强制在 function的左括号之前使用一致的空格
    "block-scoped-var": 1,                    //变量定义后未使用
    "consistent-return": 2,                   //函数返回值可能是不同类型
    "accessor-pairs": 2,                      //object getter/setter方法需要成对出现
    "dot-location": [2, "property"],          //换行调用对象方法  点操作符应写在行首
    "no-lone-blocks": 2,                      //多余的{}嵌套
    "no-empty-label": 0,                      //无用的标记
    "no-extend-native": 2,                    //禁止扩展原生对象
    "no-floating-decimal": 2,                 //浮点型需要写全 禁止.1 或 2.写法
    "no-loop-func": 2,                        //禁止在循环体中定义函数
    "no-new-func": 2,                         //禁止new Function(...) 写法
    "no-self-compare": 2,                     //不允与自己比较作为条件
    "no-sequences": 2,                        //禁止可能导致结果不明确的逗号操作符
    "no-throw-literal": 2,                    //禁止抛出一个直接量 应是Error对象
    "no-return-assign": [2, "always"],        //不允return时有赋值操作
    "no-redeclare": [2, {"builtinGlobals": true}],//不允许重复声明
    "no-unused-expressions": [2, {"allowShortCircuit": true, "allowTernary": true}],//未使用的表达式
    "no-useless-call": 2,                     //无意义的函数call或apply
    "no-useless-concat": 2,                   //无意义的string concat
    "no-void": 2,                             //禁用void
    "no-with": 2,                             //禁用with
    "no-warning-comments": [2, { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }],//标记未写注释
    "curly": 2,                               //if、else、while、for代码块用{}包围
    "one-var": 0,
    'no-console': 'off',
    "no-multiple-empty-lines": [1, {"max": 3, "maxEOF": 1}],  //空行 最多三行
    "comma-spacing":0,
    "space-before-blocks": ["off", "never"],
    // "space-before-blocks": [0, { "functions": "never", "keywords": "never", "classes": "never" }],
    "`keyword-spacing":0,

    //工程化配置
    "prettier.singleQuote": true,             // 防止格式化代码后单引号变双引号
    "update.channel": "none",                 // 配置是否从更新通道接收自动更新。更改后需要重启。
    "files.autoSaveDelay": 1500,              // 保存延时   intellij webstrom 默认制动保存
    "files.autoSave": "afterDelay",           // 文件自动保存

    // "eslint.autoFixOnSave": false,             // ESLint 自动修复




  }
};

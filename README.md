# Diary/懒懒的日记

这是一个使用Taro + TaroUI + 云开发的微信小程序，
开发的意图主要是用来熟练Taro以及云开发。

### 体验懒懒的日记
![小程序二维码](https://github.com/Lin47/Diary/blob/feature/client/src/images/app.jpg)

### 功能
+ 编写日记
+ 修改日记
+ 图片预览
+ 轮播图片
+ 云端存储图片
+ 密码设置
+ 修改密码

### 导入项目
1.在微信开发工具中导入该项目文件夹。
2.确保你开通了云开发功能。
3.在微信开发工具中将全部云函数上传并部署。
4.在云开发数据库中创建diarys、password2个集合。

### 项目结构说明
```
├───clound   //云函数目录
│   └───functions   //云函数存放目录
│       ├───ContrastPassword   //对比密码正确性
│       ├───DeleteDiary   //删除日记
│       ├───ModifyDiary   //修改日记
│       ├───ModifyPassword   //修改密码
│       ├───SearchDiary   //查询日记
│       └───SearchPassword   //查询密码
├───client   //小程序存放目录
│    ├───config //webpack配置项
│    ├───dist //打包编译后目录
│    ├───node_modules //大家都懂
│    ├───src //源码目录
│    │     ├───components //组件
│    │     ├───images //图片资源
│    │     ├───models //控制api
│    │     ├───pages //页面
│    │     ├───utils //工具函数
│    │     ├───app.js //主入口
│    │     └───app.scss //全局样式
│    ├───.editorconfig
│    ├───.eslintrc
│    ├───.gitignore
│    ├───.npmrc
│    ├───index.html
│    └───package.json
│
├───project.config.json
└───README.md
```
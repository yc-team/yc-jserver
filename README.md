# yc-jserver


## Simple and Powerful

> 1 + 1 远大于 2

1 个全局命令 + 一个本地的 json 文件 > 一个数据服务

## Feature

* 使用最新的 Express 4.*
* 默认开启 cors
* 服务支持 RESTFul api， 除了get 外，还支持 post、put、patch、delete 
* 所有写操作都会写入起服务时候指定的 json 文件
* 服务 get 支持分页：?_start=0&_end=1
* 服务 get 支持筛选过滤：?name=zhangyaochun
* 服务自定义端口号
* 本身就是一个静态服务器，执行目录下如果有 public 文件夹，直接可以访问
* 目前支持本地的 json 文件，后续支持读取远程的 json 文件

## How to install

Should be install -g

```javascript
sudo npm install yc-jserver -g
```

## How to get help

```javascript
js -h
```

## How to use

#### 指定本地的某个 json 文件

> 默认是 db.json

```javascript
js a.json
```

#### 指定端口

> 默认端口是 4000

1、带着 json 文件名

```javascript
js a.json -p 2000
```

2、不带 json 文件名


```javascript
js -p 2000
```

## Router

全面支持常规请求

```
GET   /users
GET   /users/1
GET   /users?name=zhangyaochun
GET   /users?_start=0&_end=1
POST  /users
PUT   /users/1
PATCH /users/1
DEL   /users/1
```

## How to deploy

1、部署一个本地的 RESTFul api 服务

```javascript
mkdir test
cd test
mkdir api
touch db.json

js db.json -p 8000
```

db.json 的内容可以是：

```javascript
{
   "id": "80000000",
   "name": "zhangyaochun",
   "from": "wandoujia-fe"
}
```

2、 部署一个线上的 RESTFul api 服务

其实差不多流程都类似，只是需要配置一些额外的，并且配合 pm2


## Where to use?

* RESTFul api server
* Mock server

## TODO

* 需要加一个定时备份的脚本，定期把这些文件备份一遍
* 可以接入 sso-node-sdk 来增加 api 的权限控制
* 打通 needle 来满足对 json 文件的读取和本地自动化上传
* 自动写入一些时间维度的值方便统计


## Note

* request body size 做了最大限制：10mb
* json 文件必须是合法的，不要包含任何注释内容，可以先去 [jsonlint.com](http://jsonlint.com/) lint 一下
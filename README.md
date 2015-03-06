# yc-jserver
json server for yc

## feature

* 使用最新的 Express 4.*
* 默认开启 cors
* 服务支持 RESTFul api， 除了get 外，还支持 post、put、patch、delete 
* 所有写操作都会写入起服务时候指定的 json 文件
* 服务 get 支持分页：?_start=0&_end=1
* 服务 get 支持筛选过滤：?name=zhangyaochun
* 服务自定义端口号
* 本身就是一个静态服务器，执行目录下如果有 public 文件夹，直接可以访问
* 目前支持本地的 json 文件，后续支持读取远程的 json 文件

## how to install

should be install -g

```javascript
sudo npm install yc-jserver -g
```

## how to get help

```javascript
js -h
```

## how to use

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


## 注释：

* request body size 做了最大限制：10mb
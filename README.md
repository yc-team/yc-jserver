# yc-jserver
json server for yc

## feature

* 默认开启 cors
* 本身就是一个静态服务器，执行目录下如果有public文件，直接可以访问
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

#### 指定本地的某个json文件

> 默认是 db.json

```javascript
js a.json
```

#### 指定端口

> 默认端口是 4000

1、带着json文件名

```javascript
js a.json -p 2000
```

2、不带json文件名


```javascript
js -p 2000
```
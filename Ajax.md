## 原生ajax

1：创建XMLHttpRequest();
2：向服务器发送请求； open(method,url,async) // 请求类型（GET或POST, 地址，异步(true)或者同步(false)）
3：设置发送的数据，开始和服务器端交互；
4：注册时间；
5：更新界面；

let xmlhttp;
if (window.XMLHttpRequest) {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
 } else {
   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
}

- 一个简单的get请求

xmlhttp.open("GET", url, true);
xmlhttp.send();

- 一个简单的post请求

xmlhttp.open("POST", url, true);
xmlhttp.send();

- post请求发送数据需要设置请求头

setRequestHeader(header,value) // header规定头的名称，value规定头的值

xmlhttp.open("POST", url, true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
xmlhttp.send(data);

- onreadystatechange  处理结果

onreadystatechange存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
readyState(0: 请求未初始化；1：服务器连接已建立；2：请求已接受；3：请求处理中；4：请求已完成，且响应已就绪)
status(200: ok, 404: 未找到)

xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        // 请求成功处理
        console.log(成功);
    }
}



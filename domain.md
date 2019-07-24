# 跨域

## why

跨域，通常情况下是说在两个不通过的域名下面无法进行正常的通信，或者说是无法获取其他域名下面的数据，这个主要的原因是，浏览器出于安全问题的考虑，采用了同源策略，通过浏览器对JS的限制，防止恶意用户获取非法的数据。

## 方式

* JSONP跨域

主要是通过script标签

* iframe跨域
* window.name 跨域
* document.domain 跨域
* cookie跨域
* postMessage跨域	


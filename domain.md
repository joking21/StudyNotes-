# 跨域

## why

跨域，通常情况下是说在两个不通过的域名下面无法进行正常的通信，或者说是无法获取其他域名下面的数据，这个主要的原因是，浏览器出于安全问题的考虑，采用了同源策略，通过浏览器对JS的限制，防止恶意用户获取非法的数据。

## 常见跨域
| URL        | 说明    |  是否允许通信  |
| --------   | -----   | ---- |
| http://www.domain.com/a.js <br>http://www.domain.com/b.js <br>http://www.domain.com/lab/c.js   |  同一域名，不同文件或路径  | 允许 |
| http://www.domain.com:8000/a.js<br> http://www.domain.com/b.js   |  同一域名，不同端口      |   不允许    |
| http://www.domain.com/a.js<br> https://www.domain.com/b.js        | 同一域名，不同协议      |    不允许    |
| http://www.domain.com/a.js<br> http://192.168.4.12/b.js         | 域名和域名对应相同ip      |    不允许    |
| http://www.domain.com/a.js<br> http://x.domain.com/b.js <br> http://domain.com/c.js   | 主域相同，子域不同  |  不允许  |
| http://www.domain1.com/a.js<br> http://www.domain2.com/b.js          | 不同域名      |    不允许    |


## 方式

* JSONP跨域

主要是通过script标签

* iframe跨域
* window.name 跨域
* document.domain 跨域
* cookie跨域
* postMessage跨域	


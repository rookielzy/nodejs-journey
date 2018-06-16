/**
 * RESTful API File
 * @author rookielzy
 */

/**
 * 步骤：
 * 1. 生成一个本地服务器
 */

// 依赖
const http = require('http') // 用于我们开启本地服务器

// 创建一个本地服务器
// req 对应就是 request 即请求
// res 对应就是 response 即响应
const server = http.createServer((req, res) => {
  // 服务器返回一段字符串 'Hello World'
  res.end('Hello World\n')
})

// 启动本地服务器
server.listen(3000, () => {
  // 开启成功后的回调
  console.log('The server is running on http://localhost:3000 now')
})

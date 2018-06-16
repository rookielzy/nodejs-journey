/**
 * RESTful API File
 * @author rookielzy
 */

/**
 * 准备工具：
 * 1. 编辑器（推荐VS Code）
 * 2. POSTMAN （用于请求测试）
 */

/**
 * 步骤：
 * 1. 生成一个本地服务器
 * 2. 获取请求的URL （获取特定的URL去做指定的事）
 */

// 依赖
const http = require('http') // 用于我们开启本地服务器
const url = require('url')  // 处理请求URL

// 创建一个本地服务器
// req 对应就是 request 即请求
// res 对应就是 response 即响应
const server = http.createServer((req, res) => {
  // 既然是要处理请求URL，理所当然我们需要从 req 中获取
  // req 为一个对象，里面包含了非常多的信息，现在我们只需要 URL
  // 我们需要通过 url.parse 来解析请求的 URL 从而获取更多信息
  // url.parse 中传入 true 是为了使解析后的数据中 query 字段为对象，方便处理；否侧我们将得到query字段为字符串
  const parsedUrl = url.parse(req.url, true)

  // 获取请求路径
  const path = parsedUrl.pathname

  // 简单处理 path
  // 去除多余的 `/`
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  console.log(trimmedPath)

  // 服务器返回一段字符串 'Hello World'
  res.end('Hello World\n')

  console.log()
})

// 启动本地服务器
server.listen(3000, () => {
  // 开启成功后的回调
  console.log('The server is running on http://localhost:3000 now')
})

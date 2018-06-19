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
 * 3. 获取请求方式
 * 4. 获取URL参数（query string）
 * 5. 获取请求头（Headers）
 * 6. 获取请求所带的数据
 */

// 依赖
const http = require('http') // 用于我们开启本地服务器
const url = require('url')  // 处理请求URL
const StringDecoder = require('string_decoder').StringDecoder

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
  const method = req.method.toLowerCase()

  // 获取URL参数（query string）
  const queryStringObject = parsedUrl.query

  // 获取请求头
  const headers = req.headers

  // 由于请求所带的数据是二进制，我们需要进行转换处理
  // 这里我们演示使用 utf-8 来解码字符串数据
  const decoder = new StringDecoder('utf-8')
  let buffer = '' // 存储结果

  // 监听请求数据的接入(若有数据的话)
  req.on('data', data => {
    buffer += decoder.write(data)
  })

  // 监听请求结束（请求结束就一定会触发）
  req.on('end', () => {
    // 告诉解码方法体解码结束
    buffer += decoder.end()

    // 服务器返回一段字符串 'Hello World'
    res.end('Hello World\n')

    console.log('Request received with this payload: ', buffer)
  })
})

// 启动本地服务器
server.listen(3000, () => {
  // 开启成功后的回调
  console.log('The server is running on http://localhost:3000 now')
})

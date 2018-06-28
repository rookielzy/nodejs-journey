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
 * 7. 处理路由
 * 8. 返回JSON格式数据 
 */

// 路由处理
const handlers = {
  sample: (data, callback) => {
    callback(406, { 'name': 'sample handler' })
  },
  notFound: (data, callback) => {
    callback(404)
  }
}


// 定义路由
const router = {
  'sample': handlers.sample,
  'notFound': handlers.notFound
}


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

    // 获取请求路由处理方法体
    const choseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router.notFound

    // 拼接数据返回给路由处理函数
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    }

    // 将路由指向特定的处理函数中
    choseHandler(data, (statusCode, payload) => {
      // 获取处理函数中指定的状态码，否则默认返回200
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200
      // 获取路由处理函数中回调函数返回的数据，否则默认返回空对象
      payload = typeof(payload) === 'object' ? payload : {}

      // 将返回的数据转换为字符串
      const payloadString = JSON.stringify(payload)

      // 返回响应
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)

      console.log('Return this response: ', statusCode, payloadString)
    })
  })
})

// 启动本地服务器
server.listen(3000, () => {
  // 开启成功后的回调
  console.log('The server is running on http://localhost:3000 now')
})

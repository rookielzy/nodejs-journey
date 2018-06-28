/**
 * 创建配置文件
 * @author rookielzy
 */

const envs = {}

// Staging 默认的环境
envs.staging = {
  'port': 3000,
  'envName': 'staging'
}

// Production 生产环境
envs.production = {
  'port': 5000,
  'envName': 'production'
}

// 判断使用的哪个环境
const currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// 导出配置信息
const envToExport = typeof(envs[currentEnv]) === 'object' ? envs[currentEnv] : evns.staging

module.exports = envToExport

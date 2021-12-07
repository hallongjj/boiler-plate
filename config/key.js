// process.env.NODE_ENV: 환경변수. 
// local 환경이면 development모드, Deploy(배포)한 후면 production모드
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
} 
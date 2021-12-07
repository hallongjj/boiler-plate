const express = require('express')
const app = express()
const port = 5000    // 포트 숫자는 중요하지 않다.

const bodyParser = require('body-parser');
const { User } = require("./models/User");

// body-parser는 클라이언트가 보내는 정보를 분석해서 가져오는 역할을 한다.
// urlencoded: application/x-www-from-urlencoded 타임의 데이터를 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended: true}));
// json: application/json 타임의 데이터를 분석해서 가져온다.
app.use(bodyParser.json());

const mongoose = require('mongoose')
const config = require('./config/key')
mongoose.connect(config.mongoURI, {
    // userNewUrlParser: true, useUnifiedToology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


// get메소드를 이용한 route
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~!!!!!!')
})

// post메소드를 이용한 회원가입 route
app.post('/register', (req, res) => {
  // 회원가입에 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)
  // save()는 mongoDB에서 제공하는 메서드 : 정보들의 user에 저장된다.
  user.save((err, userinfo) => {
    // error가 발생했을 때, json형식으로 전달, 에러메시지를 전달한다.
    if(err) return res.json({success: false, err})
    // 성공했을 때 상태 200을 전달한다.
    return res.status(200).json({
      success: true
    })
  })
})






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
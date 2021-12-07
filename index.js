const express = require('express')
const app = express()
const port = 5000    // 포트 숫자는 중요하지 않다.

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hallongjj:1234@cluster0.nndrh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    // userNewUrlParser: true, useUnifiedToology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))






app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
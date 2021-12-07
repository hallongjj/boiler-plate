const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,   // 문자열의 빈 공간을 없애주는 역할
        unique: 1     // 이메일이 중복되지 않도록 한다.
    }, 
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {   // 관리자, 일반유저 등 역할 지정
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { // 토큰의 유효기간
        type: Number
    }
}) 

// 스키마를 모델로 감싸준다.
const User = mongoose.model('User', userSchema)

// 이 모델을 다른 곳에서도 가져다 쓸 수 있도록 한다.
module.exports = {User}
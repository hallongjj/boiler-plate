const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// bcrypt를 사용하기 위해서는 먼저 salt를 생성해야 한다.
// 생성된 salt로 비밀번호를 암호화 시킴
// saltRounds: salt의 크기, salt가 몇글자인지 나타냄
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 문자열의 빈 공간을 없애주는 역할
        unique: 1 // 이메일이 중복되지 않도록 한다.
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자, 일반유저 등 역할 지정
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

// mongoose에서 가져온 메서드
// 어떤 특정 메서드를 실행하기 전에 실행하라는 메서드
userSchema.pre('save', function (next) {
    var user = this;
    // 사용자 정보가 바뀔때 마다 비밀번호가 암호화 되는 것이 아니라,
    // password가 변경될 때만 비밀번호가 암호화 되어야 한다.
    // 그 외에는 바로 다음 메서드 실행.
    if (user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        // 비밀번호를 암호화 시킬 salt를 생성한다 (genSalt())
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            // salt가 생성되면 user에 입력된 비밀번호를 가져와서
            // salt를 이용해서 암호화를 진행한다.
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                // 메서드가 종료되면 다음 메서드(여기서는 save)가 실행되도록 함
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword를 암호화 한 비밀번호와 데이터베이스에 있는 암호화된 비밀번호가 같은지 확인한다.
    // 암호화된 비밀번호를 복호화 할 수는 없다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성한다.
    // _id 는 데이터베이스에 있는 _id
    // user._id + 'secretToken' = token
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // user._id + '' = token
    // 토큰을 decode(복호화)한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id" : decoded, "token" : token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

// 스키마를 모델로 감싸준다.
const User = mongoose.model('User', userSchema)

// 이 모델을 다른 곳에서도 가져다 쓸 수 있도록 한다.
module.exports = {
    User
}
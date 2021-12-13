const express = require('express');
const app = express();
const port = 5000; // 포트 숫자는 중요하지 않다.

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

// body-parser는 클라이언트가 보내는 정보를 분석해서 가져오는 역할을 한다.
// urlencoded: application/x-www-from-urlencoded 타임의 데이터를 분석해서 가져온다.
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
// json: application/json 타임의 데이터를 분석해서 가져온다.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const config = require('./config/key');
mongoose
    .connect(config.mongoURI, {
        // userNewUrlParser: true, useUnifiedToology: true, useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// get메소드를 이용한 route
app.get('/', (req, res) => {
    res.send('Hello World! 안녕하세요~!!!!!!');
});

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요~!');
});

// post메소드를 이용한 회원가입 route
app.post('/api/users/register', (req, res) => {
    // 회원가입에 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);
    // save()는 mongoDB에서 제공하는 메서드 : 정보들의 user에 저장된다.
    user.save((err, userinfo) => {
        // error가 발생했을 때, json형식으로 전달, 에러메시지를 전달한다.
        if (err)
            return res.json({
                success: false,
                err,
            });
        // 성공했을 때 상태 200을 전달한다.
        return res.status(200).json({
            success: true,
        });
    });
});

app.post('/api/users/login', (req, res) => {
    // 1.데이터베이스에 요청한 email이 있는지 확인한다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당되는 유저가 없습니다.',
            });
        }

        // 2. 요청된 email이 데이터베이스에 있으면 비밀번호가 맞는지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });

            // 3. 비밀번호가 맞다면 token을 생성한다.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등 저장할 수 있는 공간은 많음.
                // 저장하는 위치에 따라 장단점이 있다. 여기서는 쿠키에 저장해 볼 것이다.
                // 쿠키에 저장하기 위해서는 cookie-parser라이브러리가 필요하다. (다운로드 할 것)
                res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

// 유저 인증
// auth : 미들웨어.
// 미들웨어: 엔드포인트에 리퀘스트를 받은 다음에 콜백함수를 하기전에 중간에 뭔가를 해주는 것.
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

// 로그아웃
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true,
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

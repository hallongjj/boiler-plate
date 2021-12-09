const { User } = require('../models/User');

// 인증처리를 하는 곳
let auth = (req, res, next) => {

    // 1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    // 2. 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err
        // 4. 유저가 없으면 인증 No.
        if (!user) return res.json({
            isAuth: false,
            error: true
        })
        
        // 3. 유저가 있으면 인증 OKay.
        // req에 token과 user정보를 넣어서 같이 전달하면 
        // index.js에서 req.user로 해당 정보를 꺼내쓸 수 있다.
        req.token = token;
        req.user = user;
        // 미들웨어를 종료하고 다음으로 넘어가도록 꼭 넣어줘야 한다.
        next();
    })
}



module.exports = {
    auth
};
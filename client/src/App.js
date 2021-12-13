import React from 'react';
import {
    BrowserRouter as Router,
    // Routes,
    Route,
    Switch,
    // Link
} from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

import auth from './hoc/auth';

function App() {
    return (
        <Router>
            <div>
                {/* router v.5에서는 Switch를 사용하고, v.6에서는 Routes를 사용함. */}
                <Switch>
                    {/* auth메서드에 파라미터 전달. (감싸줄 컴포넌트, 접근가능 권한, admin체크) 
                    admin은 auth.js에서 기본값으로 null을 주고 있으므로 입력하지 않아도 된다.*/}
                    <Route exact path="/" component={auth(LandingPage, null)} />
                    <Route exact path="/login" component={auth(LoginPage, false)} />
                    <Route exact path="/register" component={auth(RegisterPage, false)} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

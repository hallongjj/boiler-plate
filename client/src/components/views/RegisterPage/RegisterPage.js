import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// user_action에서 registerUser를 가져온다.
import { registerUser } from '../../../_action/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Email, Name, Password, ConfirmPassword 의 state를 생성한다.
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    // 각각의 Handler를 만든다.
    const onEmailHandler = event => {
        setEmail(event.currentTarget.value);
    };
    const onNameHandler = event => {
        setName(event.currentTarget.value);
    };
    const onPasswordHandler = event => {
        setPassword(event.currentTarget.value);
    };
    const onConfirmPasswordHandler = event => {
        setConfirmPassword(event.currentTarget.value);
    };

    const onSubmitHandler = event => {
        event.preventDefault();
        // Password와 ConfirmPassword가 동일한지 확인한다. 동일해야만 회원가입 가능.
        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }
        let body = {
            email: Email,
            name: Name,
            password: Password,
        };
        // 회원가입이 성공하면 로그인 페이지로 이동.
        dispatch(registerUser(body)).then(response => {
            if (response.payload.success) {
                navigate('/login');
            } else {
                alert('Failed to sign up');
            }
        });
    };
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>ConfirmPassword</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;

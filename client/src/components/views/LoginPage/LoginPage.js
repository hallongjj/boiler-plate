import React, { useState } from 'react'
// import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_action/user_action'
import { useNavigate } from 'react-router-dom'

function LoginPage(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // email과 password의 value 부분을 state에 넣어줘야함. 
    // 이 안에서 데이터의 변화를 줄 때는 state의 변화를 시켜서 데이터가 변할 수 있도록 해야하기 때문.
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        // console.log("eamil: ", Email)
        // console.log("password: ", Password)

        let body = {
            email: Email,
            password: Password
        }

        // // v.5
        // dispatch(loginUser(body))
        //     .then(response => {
        //         if(response.payload.loginSuccess)
        //         {
        //             props.history.push('/')
        //         } else {
        //             alert('Error')
        //         }
        //     })
        
        // v.6
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess)
                {
                    navigate('/')
                } else {
                    alert('Error')
                }
            })
    }

    return (
        <div style={{
            display: 'flex' , justifyContent: 'center', alignItems: 'center',
            width: '100%' , height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button type="submit">Login</button>
            </form>

        </div>
    )
}

export default LoginPage;


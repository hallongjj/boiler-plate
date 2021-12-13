import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/hello').then(response => console.log(response.data));
    }, []);

    const onClickHandler = () => {
        // redux를 사용하지 않을 것이기 때문에 여기에 바로 axios를 사용한다.
        axios.get('/api/users/logout').then(response => {
            console.log(response.data);
            if (response.data.success) {
                navigate('/login');
            } else {
                alert('로그아웃이 실패하였습니다.');
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
            <h2>시작페이지</h2>
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    );
}

export default LandingPage;

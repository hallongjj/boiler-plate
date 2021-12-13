import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';

export default function ex(SpecificComponent, option, adminRoute = null) {
    // SpecificComponent : 감싸줄 컴포넌트, 이동할 컴포넌트
    // option : 접근할 수 있는 권한 설정
    // - null : 누구나 접근가능(기본)
    // - true : 로그인한 사람만 접근 가능
    // - false : 로그인하지 않은 사람만 접근 가능.
    // adminRoute = null : 기본값으로 null 적용

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);
                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login');
                    }
                } else {
                    // 로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } else {
                        if (!option) {
                            props.history.push('/');
                        }
                    }
                }
            });
        }, []);

        return <SpecificComponent />;
    }

    return AuthenticationCheck;
}

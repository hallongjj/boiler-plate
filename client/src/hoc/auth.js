// import React, { useEffect } from 'react';
// // import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { auth } from '../_action/user_action';

// export default function (SpecificComponent, option, adminRoute = null) {
//     // SpecificComponent : 감싸줄 컴포넌트
//     // option : null => 아무나 출입이 가능한 페이지 , true => 로그인한 유저만 출입이 가능한 페이지 , false => 로그인한 유저는 출입 불가
//     function AuthenticationCheck(props) {
//         const dispatch = useDispatch();
//         useEffect(() => {
//             dispatch(auth()).then(response => {
//                 console.log(response);
//             });
//         }, []);
//         return <SpecificComponent />;
//     }

//     return AuthenticationCheck;
// }

import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit).then(response => response.data);

    // request를 reducer로 전달한다.
    // 이때 형태는 객체형태의 action으로 전달해야 한다.
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function registerUser(dataTosubmit) {
    const request = axios.post('/api/users/register', dataTosubmit).then(response => response.data);
    // type는 REGISTER_USER
    return {
        type: REGISTER_USER,
        payload: request,
    };
}

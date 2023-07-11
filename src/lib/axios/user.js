import {get, post} from './axios'


// http://753p8745p2.zicp.fun:43620/user/login

export function login(username, password) {
    return post(`/user/login`, {
        uname: username,
        pwd: password
    })
}


export function sendCode(email) {
    // console.log('lib/axios/user.js: sendCode')
    return get(`/user/email?email=${email}`)
}

export function register(email, token, code, username, password) {
    return post(`/user/register`, {
        email,
        token,
        code,
        uname: username,
        pwd: password
    })
}

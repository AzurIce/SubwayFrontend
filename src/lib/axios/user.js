import {get, post} from './axios'

const host = 'http://192.168.43.128:3308'
// http://753p8745p2.zicp.fun:43620/user/login

export function login(username, password) {
    return post(`${host}/user/login`, {
        uname: username,
        pwd: password
    })
}


export function sendCode(email) {
    // console.log('lib/axios/user.js: sendCode')
    return get(`${host}/user/email?email=${email}`)
}

export function register(email, token, code, username, password) {
    return post(`${host}/user/register`, {
        email,
        token,
        code,
        uname: username,
        pwd: password
    })
}

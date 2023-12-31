import {get, post} from './axios'

export function login(username, password) {
    return post(`/user/login`, {
        uname: username,
        pwd: password
    }, false)
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

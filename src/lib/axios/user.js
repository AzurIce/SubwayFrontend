import axios from 'axios'

const host = 'http://192.168.43.128:3308'
// http://753p8745p2.zicp.fun:43620/user/login

export function login(username, password) {
    return axios.post(`${host}/user/login`, {
        uid: username,
        pwd: password
    })
}
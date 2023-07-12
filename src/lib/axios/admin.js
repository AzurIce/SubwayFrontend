import { get, post } from './axios'

export async function getUsers() {
    return await get('/user/all')
}

export async function deleteUser(id) {
    return await get(`/user/delete?uid=${id}`)
}

export async function logout() {
    return  post(`/user/logout`)
}

export function updateUserInfo(id, name, mail, premission) {
    return post(`/user/update`, {
        id:id,
        name:name,
        mail:mail,
        premission:premission,
    })
}
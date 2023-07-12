import { get, post } from './axios'

export async function getUsers() {
    return await get('/user/all')
}

export async function deleteUser(id) {
    return await post(`/user/delete?uid=${id}`, {}, true)
}

export async function logout() {
    return await post(`/user/logout`, {}, true)
}

export async function updateUserInfo(id, name, per,email) {
    return await post(`/user/update`, {
        id: id,
        name: name,
        email: email,
        per: per,
    }, true)
}
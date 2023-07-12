import { get } from './axios'

export async function getUsers() {
    return await get('/user/all')
}

export async function deleteUser(id) {
    return await get(`/user/delete?uid=${id}`)
}

export async function logout() {
    return await get(`/user/logout`)
}
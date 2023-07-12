import axios from 'axios'

// const host = 'http://192.168.43.128:3308'
// const host = 'http://123.60.53.131:3308'
// const host = 'http://120.46.129.79:3308'
const host = 'http://124.70.109.243:3308'

export function get(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${host}${url}`, {
        timeout: 3000,
        headers: {
          token: window.localStorage.getItem('xxqToken')
        }
      })
      .then((res) => {
        if (res.data.code != '200000') {
          reject(res.data.msg)
        } else {
          resolve(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function post(url, data, withToken) {
  const options = withToken
    ? {
        timeout: 3000,
        headers: {
          token: window.localStorage.getItem('xxqToken')
        }
      }
    : {
        timeout: 3000
      }
  return new Promise((resolve, reject) => {
    axios
      .post(`${host}${url}`, data, options)
      .then((res) => {
        if (res.data.code != '200000') {
          reject(res.data.msg)
        } else {
          resolve(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

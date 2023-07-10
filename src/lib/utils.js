export function timeCount(fun, ...args) {
    // console.log(`> ${fun.name}`)
    console.time(`${fun.name}`)
    const res = fun(...args)
    console.timeEnd(`${fun.name}`)
    // console.log(`< ${fun.name}`)
    return res
}

export async function timeCountAsync(name, asyncFun, ...args) {
    // console.log(`> ${fun.name}`)
    console.time(`${name}`)
    const res = await asyncFun(...args)
    console.timeEnd(`${name}`)
    // console.log(`< ${fun.name}`)
    return res
}
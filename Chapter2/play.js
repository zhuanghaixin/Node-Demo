// const fetchData=(callback)=>{
//     setTimeout(()=>{
//         callback('Done!')
//     },1500)
// }
//
//
// setTimeout(()=>{
//     console.log('Timer is done')
//     fetchData(text=>{
//         console.log(text)
//     })
// },2000)
// console.log('1233')
// console.log('2333')

//使用Promise改写,
const fetchData=()=>{
    const promise=new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Done!')
        },1500)
    })
    return promise

}
//没有return Promise
setTimeout(()=>{
    console.log('Timer is done')
    fetchData().then(text=>{
        console.log(text,'第一次')
        fetchData().then(text2=>{
            console.log(text2,'第二次')
        })
        fetchData().then(text3=>{
            console.log(text3,'第次')
        })

    })
},2000)

setTimeout(()=>{
    console.log('Timer is done')
    fetchData()
        .then(text=>{
        console.log(text,'第一次')
       return fetchData()
    })
        .then(text=>{
        console.log(text,'第二次')
        return fetchData()
    })
        .then(text=>{
            console.log(text,'第三次')
            return fetchData()
        })

},2000)
console.log('1233')
console.log('2333')

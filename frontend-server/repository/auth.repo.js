const fetch=require('node-fetch')
async function getRefreshRepo(email,password){
    const getRefresh=await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email:email,password:password})
    })
    const refreshToken = await getRefresh.json()
    return refreshToken
}
async function getAccessRepo(refresh){
    const getAccess=await fetch('http://localhost:3001/auth/access-token', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization':`Bearer ${refresh}`
        },
    })
    const accessToken = await getAccess.json()
    return accessToken
}

async function registerRepo(data){
    const submitToRegister=await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body:JSON.stringify(data)
    })
    const status = await submitToRegister.json()
    return status
}

async function getUserInformation(accessToken){
    const getAccess=await fetch('http://localhost:3001/user/get-info', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization':`Bearer ${accessToken}`
        },
    })
    const data = await getAccess.json()
    return data
}


async function updateUserInformation(accessToken,data){
    const sendUpdate=await fetch('http://localhost:3001/user/update', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization':`Bearer ${accessToken}`
        },
        body:JSON.stringify(data)
    })
    const resData = await sendUpdate.json()
    return resData
}


module.exports={getRefreshRepo,getAccessRepo,registerRepo,getUserInformation,updateUserInformation}
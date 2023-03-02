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

module.exports={getRefreshRepo,getAccessRepo,registerRepo}
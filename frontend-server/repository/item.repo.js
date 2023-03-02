const fetch=require('node-fetch')
async function authRepo(email,password){
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
module.exports=authRepo
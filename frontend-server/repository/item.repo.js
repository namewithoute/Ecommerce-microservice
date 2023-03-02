const fetch=require('node-fetch')
async function itemPerPageRepo(page,accessToken){
    const getItems=await fetch(`http://localhost:3002/product/get-all/?page=`+page, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            // 'Authorization':'Bearer '+accessToken
        },
    })
    const items = await getItems.json()
    return items
}

async function itemDetailRepo(itemId){
    const getItem=await fetch(`http://localhost:3002/product/`+itemId, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            // 'Authorization':'Bearer '+accessToken
        },
    })
    const item = await getItem.json()
    return item
}

module.exports={itemPerPageRepo,itemDetailRepo}
const { default: mongoose } = require("mongoose");
const init = require("./config/connect.mongo");
const ItemModel = require("./models/Item.model");
const ItemOptionModel = require("./models/ItemOption.model");
init('mongodb+srv://snoopi:tranquocnam123@cluster0.8fkjx.mongodb.net/product_service?retryWrites=true&w=majority')
async function addnew() {
    await ItemOptionModel.insertMany([
        {
            "size": "L",
            "color": "Blue",
            "quantity": 10,
            "sold": 2,
            "volume": {
                "height": 20,
                "weight": 10,
                "width": 15,
                "length": 25
            }
        },
        {
            "size": "M",
            "color": "Red",
            "quantity": 5,
            "sold": 1,
            "volume": {
                "height": 15,
                "weight": 8,
                "width": 10,
                "length": 20
            }
        },
        {
            "size": "S",
            "color": "Green",
            "quantity": 20,
            "sold": 5,
            "volume": {
                "height": 30,
                "weight": 12,
                "width": 25,
                "length": 40
            }
        },
        {
            "size": "XL",
            "color": "Yellow",
            "quantity": 15,
            "sold": 3,
            "volume": {
                "height": 25,
                "weight": 14,
                "width": 20,
                "length": 35
            }
        },
        {
            "size": "M",
            "color": "Blue",
            "quantity": 7,
            "sold": 1,
            "volume": {
                "height": 18,
                "weight": 9,
                "width": 12,
                "length": 22
            }
        },
        {
            "size": "S",
            "color": "Red",
            "quantity": 12,
            "sold": 2,
            "volume": {
                "height": 25,
                "weight": 10,
                "width": 20,
                "length": 30
            }
        },
        {
            "size": "L",
            "color": "Green",
            "quantity": 8,
            "sold": 2,
            "volume": {
                "height": 22,
                "weight": 11,
                "width": 18,
                "length": 28
            }
        },
        {
            "size": "XL",
            "color": "Black",
            "quantity": 18,
            "sold": 4,
            "volume": {
                "height": 28,
                "weight": 13,
                "width": 23,
                "length": 38
            }
        }
    ]
    )
}
// addnew()

async function query() {
    const item = await ItemModel.findOne({itemId:'pd1'}).populate('itemOptions')
    console.log(item)
}
query()
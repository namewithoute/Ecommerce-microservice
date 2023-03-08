const ItemInOrder=require('../models/ItemInOrder.model')

function ItemInOrderBuilder(){
    this.itemInOrder=new ItemInOrder()
    this.setItemId=function(itemId){
        this.itemInOrder.itemId=itemId
        return this
    }
    this.setItemName=function(name){
        this.itemInOrder.itemName=name
        return this
    }
    this.setColor=function(color){
        this.itemInOrder.color=color
        return this
    }
    this.setSize=function(size){
        this.itemInOrder.size=size
        return this
    }
    this.setQuantity=function(quantity){
        this.itemInOrder.quantity=quantity;
        return this
    }
    this.setPrice=function(price){
        this.itemInOrder.price=price;
        return this
    }
    this.build=function(){
        return this.itemInOrder
    }
}

module.exports=ItemInOrderBuilder
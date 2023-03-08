var Order = require('../models/Order.model')
const { v4: uuidv4 } = require('uuid');
function orderBuilder(){
    this.order=new Order();
    this.orderId=uuidv4()
    this.setEmail=function(email) {
        this.order.email = email;
        return this;
      }
    
    this.setPaymentMethod=function(paymentMethod) {
        this.order.paymentMethod = paymentMethod;
        return this;
      }
    
    this.setIsPaid=function(isPaid) {
        this.order.isPaid = isPaid;
        return this;
      }
    
    this.setSubtotal=function(subtotal) {
        this.order.subtotal = subtotal;
        return this;
      }
    
    this.setShippingFee=function(shippingFee) {
        this.order.shippingFee = shippingFee;
        return this;
      }
    
    this.setTotal =function(total){
        this.order.total = total;
        return this;
      }
    
    this.setNote=function(note) {
        this.order.note = note;
        return this;
      }
    
    this.setVoucher=function(voucherCode, value) {
        this.order.voucher.voucherCode = voucherCode;
        this.order.voucher.value = value;
        return this;
      }
    
    this.addItem=function(item){
        this.order.items.push(item);
        return this;
      }
    
    this.setDeliveryStatus=function(status) {
        this.order.deliveryStatus.status = status;
        this.order.deliveryStatus.updatedAt = new Date();
        return this;
      }
    
    this.setIsCancel=function(isCancel) {
        this.order.isCancel = isCancel;
        return this;
      }
    
    this.setShippingAddress=function(shippingAddress) {
        this.order.shippingAddress = shippingAddress;
        return this;
      }
    
    this.build=function() {
        return this.order;
      }
}
module.exports=orderBuilder
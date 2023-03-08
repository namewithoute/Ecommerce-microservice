const User = require('../models/User.model')

function UserBuider() {
    this.user = new User()
    // this.user.address=
    this.setEmail = function (email) {
        this.user.email = email;
        return this;
    }

    this.setPhone = function (phone) {
        this.user.phone = phone;
        return this;
    }

    this.setPassword = function (password) {
        this.user.password = password;
        return this;
    }

    this.setTypeLogin = function (typeLogin) {
        this.user.typeLogin = typeLogin;
        return this;
    }

    this.setFirstName = function (firstName) {
        this.user.firstName = firstName;
        return this;
    }

    this.setLastName = function (lastName) {
        this.user.lastName = lastName;
        return this;
    }

    this.setStatus = function (status) {
        this.user.status = status;
        return this;
    }

    this.setGender = function (gender) {
        this.user.gender = gender;
        return this;
    }

    this.setRole = function (role) {
        this.user.role = role;
        return this;
    }
    this.setDOB = function (dob) {
        this.user.dob = dob;
        return this;
    }
  
    this.setIsVerify = function (isVerify) {
        this.user.isVerify = isVerify;
        return this;
    }
    

    this.buildInfor = function () {
        return this.user;
    }
}
module.exports=UserBuider
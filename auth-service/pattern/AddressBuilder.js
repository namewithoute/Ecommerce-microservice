const Address = require('../models/Address.model')
function AddressBuilder() {
    this.address = new Address()
    this.setProvince = function (name, ID) {
        this.address.province.name = name;
        this.address.province.ID = ID;
        return this;
    }

    this.setDistrict = function (name, ID) {
        this.address.district.name = name;
        this.address.district.ID = ID;
        return this;
    }

    this.setWard = function (name, ID) {
        this.address.ward.name = name;
        this.address.ward.ID = ID;
        return this;
    }

    this.setSpecify = function (specify) {
        this.address.specify = specify;
        return this;
    }

    this.build = function () {
        return this.address;
    }
}
module.exports=AddressBuilder
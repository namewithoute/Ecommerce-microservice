const { body, validationResult } = require('express-validator');
const User= require('../models/User.model')
function validateRegisterUser() {
    return [
        body('email').isEmail().withMessage('Email nhập vào không hợp lệ').not().isEmpty().withMessage('Không được để trống trường này').custom(email=>{
            return User.findOne({email:email}).then((user)=>{
                if(user){
                    return Promise.reject('Email đã được sử dụng, vui lòng sử dụng email khác')
                }
            })
        }),
        body('phone').isLength({ min: 10 }).withMessage('Số điện thoại bao gồm ít nhất 10 ký tự').not().isEmpty().withMessage('Không được để trống trường này'),
        body('password').isLength({ min: 6 }).withMessage('Mật khẩu ít nhất có 6 ký tự').not().isEmpty().withMessage('Không được để trống trường này'),
        body('confirmPass').custom((value,{req})=>{
            if (value !== req.body.password) {
                throw new Error('Xác nhận mật khẩu không đúng, vui lòng kiểm tra lại');
              }
              return true
        }),
        body('firstName').trim().not().isEmpty().withMessage('Không được để trống trường này'),
        body('lastName').trim().not().isEmpty().withMessage('Không được để trống trường này'),
        body('gender').isNumeric().withMessage('Giới tính không hợp lệ vui lòng kiểm tra lại').not().isEmpty().withMessage('Thông tin không hợp lệ, vui lòng thử lại'),
        body('dob').isISO8601().toDate().withMessage('Vui lòng chọn ngày hợp lệ')]
}
module.exports = validateRegisterUser
const express = require('express')
const initMongo = require('./config/connect.mongo')
const client = require('./config/connect.redis')
const app = express()
require('dotenv').config()
const User = require('./models/User.model')
const { generateAccess, generateRefresh } = require('./utils/init.jwt')
const AddressBuilder = require('./pattern/AddressBuilder')
const UserBuilder = require('./pattern/UserBuilder')
const validateRegisterUser = require('./validators/register.validation')
var { validationResult } = require('express-validator');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')

const PORT = process.env.PORT || 3001
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, MONGO_URL } = process.env
initMongo(MONGO_URL)
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000/'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body
    try {
        var user = await User.findOne({ email: email})
        var isValidPassword= await bcrypt.compare(password,user.password)
        console.log(user,isValidPassword)
    }
    catch (e) {
        return res.status(401).json({ 'status': 400, message: 'Đã có lỗi xảy ra vui lòng refresh lại trang' })
    }
    if (user && isValidPassword) {
        const { username, firstName, lastName, phone, email } = user
        var refreshToken = await generateRefresh({
            data: {
                username,
                firstName,
                lastName,
                phone,
                email
            }
        }, REFRESH_TOKEN_KEY)
        await client.sAdd('refresh_token', refreshToken)
        return res.status(200).json({ rfs: refreshToken })
    }
    return res.status(401).json({ 'status': 401, message: 'Tài khoản hoặc mật khẩu không đúng vui lòng kiểm tra lại!' })
})

app.get('/auth/access-token', (req, res) => {
    const refreshToken = req.headers.authorization.split(' ')[1]
    jwt.verify(refreshToken, REFRESH_TOKEN_KEY, async function (err, decoded) {
        if (err) {
            console.log(err)
            return res.json({ message: 'invalid token' })
        }
        else {
            var isRefreshTokenInRedis = await client.sMembers('refresh_token')
            if (!isRefreshTokenInRedis.includes(refreshToken)) {
                return res.json({ message: 'invalid token' })
            }
            var token = await generateAccess(decoded.data, ACCESS_TOKEN_KEY)
            res.json({ accessToken: token })
        }
    })
})

app.post('/auth/register', validateRegisterUser(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        const {email,phone,firstName,lastName,gender,dob}=req.body
        return res.status(400).json({ 'status': 400, message: 'Error validation fields', errors: errors.errors,data:{email,phone,firstName,lastName,gender,dob}})
    }
    const {
        email,
        password,
        firstName,
        lastName,
        phone,
        gender,
        dob,
    } = req.body
    var user = new UserBuilder()
        .setEmail(email)
        .setPassword(password)
        .setFirstName(firstName)
        .setLastName(lastName)
        .setPhone(phone)
        .setGender(gender)
        .setDOB(dob)
        .buildInfor()
    try {
        var addNewUser = await user.save()
    }
    catch (e) {
        return res.status(400).json({ 'status': 400, message: 'Register failed please try again'})
    }
    return res.status(200).json({'status':200,message:'Create new account success'})
})

app.listen(PORT, () => {
    console.log(`auth service listen at ${PORT}`)
})
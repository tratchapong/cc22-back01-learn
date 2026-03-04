import createHttpError from 'http-errors'
import {prisma} from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function register(req, res, next) {
  const {username, nickname, password} = req.body
  // validation
  if(!username.trim() || !password.trim()) {
    // const valErr = new Error('username and password are required')
    // valErr.status = 400
    // return next(valErr)
    return next(createHttpError[400]('username and password are required'))
  }
  // check ว่ามีชื่อรึยัง 
  const userExist = await prisma.user.findFirst({
    where : { username : username }
  })
  if(userExist) {
    return next(createHttpError[409]('already have this username'))
  }
  // hash password ก่อน
  const hashedPassword = await bcrypt.hash(password, 5)
  
  // สร้าง user ใน db
  const rs = await prisma.user.create({data : {
    username : username,
    password : hashedPassword,
    nickname: nickname
  } })
  console.log(rs)
  const {password : pw, ...newUser} = rs //ลบ key password ออกก่อนส่ง res
  res.json( { message : 'User created..', user : newUser} )
}

export async function login(req, res, next) {
  const {username, password} = req.body
  // validation
  if(!username.trim() || !password.trim()) {
    return next(createHttpError[400]('username and password are required'))
  }
  // check ว่ามี user นี้ไหม
  const userExist = await prisma.user.findFirst({
    where : { username : username }
  })
  if(!userExist) {
    return next(createHttpError[401]('Invalid login 1'))
  }
  // check password 
  const pwOk = await bcrypt.compare(password, userExist.password)
  if(!pwOk) {
    return next(createHttpError[401]('Invalid login 2'))
  }

  // สร้าง accessToken แล้วส่งให้ front
  // ติดตั้ง npm i jsonwebtoken ก่อน
  const payload = { id: userExist.id, username: userExist.username }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d'
  })
  console.log(token)
  res.json({
    message : 'Login Successful',
    accessToken : token
  })
}

export function getMe(req, res) {
  res.json('Getme service')
}

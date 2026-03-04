import createHttpError from 'http-errors'
import {prisma} from '../lib/prisma.js'
import bcrypt from 'bcrypt'

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

export function login(req, res) {
  res.json('Login service')
}

export function getMe(req, res) {
  res.json('Getme service')
}

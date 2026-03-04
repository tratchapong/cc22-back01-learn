import {prisma} from '../lib/prisma.js'

export function register(req, res) {

  

  res.json('Register service')
}

export function login(req, res) {
  res.json('Login service')
}

export function getMe(req, res) {
  res.json('Getme service')
}

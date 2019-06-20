import HouseService from '../services/HouseService'
import UserService from '../services/UserService'
import ChoreService from '../services/ChoreService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

let _service = new UserService()
let _repo = _service.repository
let _houseRepo = new HouseService().repository
let _choreRepo = new ChoreService().repository

export default class UserController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('/:id/chores', this.getChoresByMemberId)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such User Route' })
  }

  async create(req, res, next) {
    let house = await _houseRepo.find({ houseId: req.body.households, superAdmin: req.session.uid })
    try {
      if (house) {
        let data = await _repo.create(req.body)
        return res.status(201).send(data)
      }
    } catch (error) { next(error) }
  }
  async getById(req, res, next) {
    try {
      let data = await _repo.findById({ _id: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getChoresByMemberId(req, res, next) {
    try {
      let data = await _choreRepo.find({ memberId: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async edit(req, res, next) {
    try {
      let data = await _repo.findOne({ _id: req.params.id })
      await data.update(req.body, { new: true })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async delete(req, res, next) {
    let house = await _houseRepo.find({ houseId: req.body.houseId, superAdmin: req.session.uid })
    try {
      if (house) {
        let user = await _repo.findOne({ _id: req.params.id })
        await user.remove()
        return res.send("You're Grounded")
      }
    } catch (error) { next(error) }
  }
}

    //Profile control goes in here


//house.admins.contains(req.session.uid) || house.superAdmin == req.session.uid
import express from 'express'
import ChoreService from '../services/ChoreService'
import { Authorize } from '../middlewear/authorize'
import HouseService from '../services/HouseService'


let _service = new ChoreService()
let _repo = _service.repository
let _houseRepo = new HouseService().repository

export default class ChoreController {
  constructor() {
    this.router = express.Router()
      // .get('', this.getAllChores)
      .use(Authorize.authenticated)
      .get('/:id', this.getChoreById)
      .post('', this.createChore)
      .put('/:id', this.editChore)
      // .delete('/:id', this.deleteChore)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }
  // async getAllChores(req, res, next) {
  //   try {
  //     //only gets Chores by user who is logged in
  //     let data = await _repo.find({ houseId: req.body.houseId })
  //     return res.send(data)
  //   }
  //   catch (err) { next(err) }
  // }

  async createChore(req, res, next) {
    // let house = await _repo.findById({ houseId: req.params.id })
    // if (house.admins.contains(req.session.uid) || house.superAdmin == req.session.uid)
    let house = await _houseRepo.find({ houseId: req.body.houseId, admins: req.session.uid })
    if (house) {
      try {
        let data = await _repo.create(req.body)
        return res.status(201).send(data)
      } catch (error) { next(error) }
    }
  }
  async getChoreById(req, res, next) {
    try {
      let data = await _repo.findOne({ _id: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async editChore(req, res, next) {
    let house = await _houseRepo.find({ houseId: req.body.houseId, members: req.session.uid })
    try {
      if (house) {
        let chore = await _repo.findOne({ _id: req.body.id })
        await chore.update(req.body, { new: true })
        return res.send(chore)
      }
    } catch (error) {

    }
  }
}



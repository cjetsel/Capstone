import HouseService from '../services/HouseService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'
import ChoreService from '../services/ChoreService';
import UserService from '../services/UserService';



let _service = new HouseService()
let _repo = _service.repository
//
let _choreService = new ChoreService()
let _choreRepo = _choreService.repository

let _userRepo = new UserService().repository

export default class HouseController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/users', this.getUsersByHouseId)
      .get('/:id/chores', this.getChoresByHouseId)
      .post('', this.create)
      .put('/:id/user', this.addUser)
      .put('/:id/admin', this.addAdmin)
      .put('/:id', this.edit)
      // .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such House Route' })
  }
  async create(req, res, next) {
    try {
      let user = await _userRepo.findById(req.session.uid)
      req.body.superAdmin = req.session.uid
      req.body.admins = [req.session.uid]
      req.body.members = [req.session.uid]
      let data = await _repo.create(req.body)
      user.households.push(data._id)
      user.save(e => {
        if (e) {
          return next(e)
        }
        return res.status(201).send({ user, data })
      })

    } catch (error) { next(error) }
  }
  async getAll(req, res, next) {
    try {
      let data = await _repo.find({ superAdmin: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getById(req, res, next) {
    try {
      let data = await _repo.findOne({ _id: req.params.id, superAdmin: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getUsersByHouseId(req, res, next) {
    try {
      let house = await _repo.findById(req.params.id)
        .populate('admins')
        .populate('members')
      res.send(house)
    } catch (error) {

    }
  }


  //PUT api/houses/:id/admin 
  //Body: {
  // userId: string
  // }
  async addAdmin(req, res, next) {
    try {
      let house = await _repo.findOne({ _id: req.params.houseId, superAdmin: req.session.uid, members: { $in: [req.body.userId] } })
      if (house) {
        let exists = house.admins.find(aId => aId.equals(req.body.userId))
        if (!exists) {
          house.admins.push(req.body.userId)
          house.save(e => {
            if (e) {
              return next(e)
            }
            return res.send(house)
          })
        }
        return res.status(400).send('already an admin')
      }
      return res.status(400).send('invaild house')
    } catch (error) { next(error) }
  }

  async addUser(req, res, next) {
    try {
      let [house, newUser] = await Promise.all([
        _repo.findOne({ _id: req.params.id, admins: { $in: [req.session.uid] } }), //find house with _id and where the session id is inside the admins array
        _userRepo.findOne({ email: req.body.email })
      ])
      if (house && newUser) {
        let exists = house.members.find(aId => aId.equals(newUser._id))
        if (!exists) {
          newUser.households.push(house._id)
          house.members.push(newUser._id)
          house.save(e => {
            if (e) {
              return next(e)
            } else {
              newUser.save(e => {
                if (e) {
                  return next(e)
                }
                return res.send({ house, newUser })
              })

            }
          })
        } else {
          return res.status(400).send('already a member')
        }
      }
    } catch (e) {

    }
  }




  async edit(req, res, next) {
    try {
      let house = await _repo.findOne({ _id: req.body.houseId, superAdmin: req.session.uid })
      if (house) {
        await house.update(req.body, { new: true })
        return res.send(house)
        // house.superAdmin == req.session.uid || 
      }
      else {
        throw new Error("NO")
      }
    }
    catch (error) { next(error) }
  }

  async getChoresByHouseId(req, res, next) {
    try {
      let chores = await _choreRepo.find({ houseId: req.body.houseId })
      return res.send(chores)
    } catch (error) { next(error) }
  }

}
//house.admins.contains(req.session.uid) || house.superAdmin == req.session.uid
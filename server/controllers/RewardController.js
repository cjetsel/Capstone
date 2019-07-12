import express from 'express'
import RewardService from '../services/RewardService.js'
import HouseService from '../services/HouseService.js'
import { Authorize } from '../middlewear/authorize'


let _rewardRepo = new RewardService().repository
let _houseRepo = new HouseService().repository


export default class RewardController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllRewards)
      .get(':/id', this.getRewardById)
      .use(Authorize.authenticated)
      .post('', this.createReward)
      .delete('/:id', this.deleteReward)
      .put('/:id', this.editReward)
      .put('/:id/claim', this.claimReward)
      .get('/:id/claimed', this.getRewardsByUserId)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Reward Route' })
  }
  async getAllRewards(req, res, next) {
    try {
      let data = await _rewardRepo.find()
      return res.send(data)
    }
    catch (error) { next(error) }
  }
  async getRewardById(req, res, next) {
    try {
      let data = await _rewardRepo.findOne({ _id: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async createReward(req, res, next) {
    let house = await _houseRepo.find({ houseId: req.body.houseId, admins: req.session.uid })
    if (house) {
      try {
        let data = await _rewardRepo.create(req.body)
        return res.status(201).send(data)
      } catch (error) { next(error) }
    }
  }

  async editReward(req, res, next) {
    let house = await _houseRepo.find({ _id: req.body.editedReward.houseId, member: req.session.uid })
    try {
      if (house) {
        let reward = await _rewardRepo.findOne({ _id: req.body._id })
        await reward.update(req.body.editedReward, { new: true })
        return res.send(reward)
      }
    } catch (error) {

    }
  }
  async deleteReward(req, res, next) {
    try {
      await _rewardRepo.findOneAndRemove({ _id: req.params.id })
      return res.send("removed")
    } catch (error) {
      next(error)
    }
  }
  async claimReward(req, res, next) {
    try {
      let reward = await _rewardRepo.findByIdAndUpdate(req.params.id, { userId: req.session.uid }, { new: true })
      return res.send(reward)

    } catch (error) {
      next(error)
    }
  }
  async getRewardsByUserId(req, res, next) {
    try {
      let reward = await _rewardRepo.find({ userId: req.session.uid })
      return res.send(reward)
    } catch (error) { next(error) }
  }

}
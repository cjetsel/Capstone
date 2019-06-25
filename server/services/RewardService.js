import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  cost: { type: Number },
  houseId: { type: String, required: true },
  memberId: { type: String }
})


export default class RewardService {
  get repository() {
    return mongoose.model('Reward', _schema)
  }
}


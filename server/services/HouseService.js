import mongoose from "mongoose"
import UserService from "./UserService.js"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _userRepo = new UserService().repository //do we need this


let _schema = new Schema({
  name: { type: String, required: true },
  superAdmin: { type: ObjectId, ref: 'User', required: true },
  admins: [{ type: ObjectId, ref: 'User' }],
  members: [{ type: ObjectId, ref: 'User' }]
}, { usePushEach: true })

export default class HouseService {
  get repository() {
    return mongoose.model('House', _schema)
  }
  async adminsRoute(id, admin) {
    try {
      let house = await this.repository.findById(id)
      if (!admin._id) {
        house.admins.push(admin._id) //added ._id
      } else {
        house.admins.forEach((c, i, a) => {
          if (c._id.toString() == admin._id) {
            a.splice(i, 1)
          }
        })
      }
      await house.save()
      return house
    } catch (error) {
      throw error
    }
  }
  async membersRoute(id, member) {
    try {
      let house = await this.repository.findById(id)
      if (!member._id) {
        house.members.push(member._id) //added ._id
      } else {
        house.members.forEach((c, i, a) => {
          if (c._id.toString() == member._id) {
            a.splice(i, 1)
          }
        })
      }
      await house.save()
      return house
    } catch (error) {
      throw error
    }
  }
}





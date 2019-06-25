import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//bcrypt uses hashing and salt to obfiscate your password 
const SALT = 10


let _schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  hash: { type: String, required: true },
  households: [{ type: ObjectId, ref: "House" }],
  admin: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  rewards: [{ type: ObjectId, ref: 'Reward' }]


}, { timestamps: true, usePushEach: true })

//schema.methods are used to add a method to a Model instance
_schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.hash, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err)
      }
      return resolve(isMatch)
    })
  })
}

export default class UserService {
  get repository() {
    return mongoose.model('User', _schema)
  }
  generateHash(password) {
    return bcrypt.hashSync(password, SALT)
  }
}
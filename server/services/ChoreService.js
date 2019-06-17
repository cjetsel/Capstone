import mongoose from "mongoose"


let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _commentSchema = new Schema({
  authorId: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
}, { timestamps: true })

let _schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  memberId: { type: ObjectId, ref: "House" }, //will need TA clarification on how we look for the Id's
  assignmentDate: { type: "String" },
  adminId: { type: ObjectId, ref: "House" },
  memberComplete: { type: Boolean, default: false },
  adminComplete: { type: Boolean, default: false },
  comments: [_commentSchema],
  pointValue: { type: Number },
  icon: { type: String }
}, { timestamps: true })



export default class ChoreService {
  get repository() {
    return mongoose.model('Chore', _schema)
  }

  async commentsRoute(id, comment) {
    try {
      let chore = await this.repository.findById(id)
      if (!comment._id) {
        chore.comments.push(comment)
      } else {
        chore.comments.forEach((c, i, a) => {
          if (c._id.toString() == comment._id) {
            a.splice(i, 1)
          }
        })
      }
      await chore.save()
      return chore
    } catch (error) {
      throw error
    }
  }
}
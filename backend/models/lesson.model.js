import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    coach: {
        type: String,
        default: 'No Coach'
    },
    style: {
        type: String,
    },
    lesson_type: {
        type: String,
        enum: {
            values: ['Group', 'Private'],
            message: '{VALUE} is not a supported lesson type. Provide 3 for private or 4 for group',
        }
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
    duration: {
        type: Number,
    },
    attendies: {
        type: Number,
        default: 0,
    },
    athletes: {
        type: [String],
    },
    solved: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

LessonSchema.pre("save", function () {
    this.title = `${this.style} with ${this.coach}`
})

export default mongoose.model('Lesson', LessonSchema)

import mongoose from "mongoose";


const CoachSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [30, 'Name cannot be more than 30 characters']
    },
    last_name: {
        type: String,
        default: 'Coach'
    },
    style: {
        type: [String],
        required: [true, 'Must provide at least one swimming style'],
        enum: {
            values: ['Backstroke', 'Breaststroke', 'Butterfly', 'Freestyle'],
            message: '{VALUE} style is not supported'
        }
    },
    shift_start: {
        type: Date,
        required: [true, 'Must provide work shift details'],
    },
    shift_end: {
        type: Date,
        required: [true, 'Must provide work shift details'],
    },
    lessonsInShift: {
        type: [Number],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

CoachSchema.virtual('shift_name').get(function () {
    let name = `${this.first_name} ${this.shift_start.toString().split(' ')[0]} ${this.shift_start.getHours()}-${this.shift_end.getHours()}`
    return name
})

export default mongoose.model('Coach', CoachSchema)

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    foods:[{
        type: mongoose.Types.ObjectId,
        ref:'Foods'

    }],
    payments:{
        type: Number,
        required: true,
        min: 0
    },
    buyer:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum: ['preparing', 'prepared','on the way','delivered'],
        default:'preparing'
    }

}, { timestamps: true });

export const Orders = mongoose.model("Orders", orderSchema);

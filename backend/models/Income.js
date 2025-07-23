const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String },
    source: { type: String, required: true },//example : Salary, freelamce etc
    amount: { type: Number, required: true }, //example : 1000, 2000 etc
    date: { type: Date, default: Date.now }, //example : 2023
}, { timestamps: true } );

module.exports = mongoose.model("Income", IncomeSchema);
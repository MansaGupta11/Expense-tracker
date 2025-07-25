const xlsx = require('xlsx');
const Income = require('../models/Income');
//add income source 
    exports.addIncome = async (req, res) => {
        const userId = req.user._id; // Get user ID from the request

        try {
            const { icon, source, amount, date } = req.body;

            // Validation: check for missing fields
            if (!source || !amount || !date) {
                return res.status(400).json({ message: 'Please fill all the fields' });
            }

            // Create new income entry
            const newIncome = new Income({
                userId,
                icon,
                source,
                amount,
                date: new Date(date) // Use provided date or current date
            });

            await newIncome.save();
            res.status(200).json(newIncome);
        }  catch (error) {
            res.status(500).json({ message: 'Server Error'});
        }
    };

//get all income source 
    exports.getallIncome = async (req, res) => {
        const userId = req.user._id; // Get user ID from the request
        try {
            // Fetch all income entries for the user
            const income = await Income.find({ userId }).sort({ date: -1 });
            res.json(income);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    };

//delete income source 
    exports.deleteIncome = async (req, res) => {
        try {
            await Income.findByIdAndDelete(req.params.id);
            res.json({ message: 'Income deleted successfully' });   

        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    };

//download income excel source 
    exports.downloadIncomeExcel = async (req, res) => {
        const userId = req.user._id; // Get user ID from the request
        try {
            const income = await Income.find({ userId }).sort({ date: -1 });
            // prepare data for excel
            const data = income.map((item) => ({
                Source: item.source,
                Amount: item.amount,
                Date: item.date, 
        
            }));
            const wb = xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, 'Income');
            xlsx.writeFile(wb, 'income_details.xlsx');
            res.download('income_details.xlsx');
 
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    };
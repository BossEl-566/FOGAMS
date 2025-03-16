import Tithe from '../models/tithe.model.js';


export const createTithe = async (req, res, next) => {
    try {
        const { amount, period, weekOrMonth, paymentForMonth, mode, userID } = req.body;

        if(!amount || !period || !paymentForMonth || !mode) {
            return next(errorHandler(400, 'All fields are required'));
        }

        if(!req.user.isMember) {
            return next(errorHandler(403, 'You must be a member to pay tithe'));
        }
    
        const newTithe = new Tithe({
        userID,
        amount,
        period,
        weekOrMonth,
        paymentForMonth,
        mode,
        });
        await newTithe.save();
    
        res.status(200).json(newTithe);
    } catch (error) {
        next(error);
    }
};
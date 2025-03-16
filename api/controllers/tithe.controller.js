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

export const getTithe = async (req, res, next) => {
    if(!req.user.isMember) {
        return next(errorHandler(403, 'You must be a member to view tithes'));
    }
    try {
        const tithes = await Tithe.find({ userID: req.user.id });
        res.status(200).json(tithes);
    } catch (error) {
        next(error);
    }
};

export const getTitheId = async (req, res, next) => {
    if(!req.user.isMember) {
        return next(errorHandler(403, 'You must be a member to view tithes'));
    }
    try {
        
        const tithe = await Tithe.findById(req.params.titheId);
        res.status(200).json(tithe);
        if(tithe.userID !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to view this tithe'));
        }

        if(!tithe) {
            return next(errorHandler(404, 'Tithe not found'));
        }
    } catch (error) {
        next(error);
    }
};
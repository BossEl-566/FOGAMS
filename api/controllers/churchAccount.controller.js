import ChurchAccount from '../models/churchAccount.model.js'
import Tithe from '../models/tithe.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const createChurchAccount = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(400, 'You are not allow to perform this task'))
    }
    try {
        const { userId, nameOfThoseWhoPaid, thanksgiving, welfare, communityImpact, sundayOfferingFirstService, sundayOfferingSecondService, sundayOfferingThirdService, childrenServiceOffering, sundaySchool,midWeekOffering, fridayPrayerOffering, ifAnySpecialOfferingSpecify } = req.body;

        const newChurchAccount = new ChurchAccount({
            userId,
            nameOfThoseWhoPaid,
            thanksgiving,
            welfare,
            communityImpact,
            sundayOfferingFirstService,
            sundayOfferingSecondService,
            sundayOfferingThirdService,
            childrenServiceOffering,
            sundaySchool,
            midWeekOffering,
            fridayPrayerOffering,
            ifAnySpecialOfferingSpecify,
        });
        await newChurchAccount.save();

        res.status(200).json(newChurchAccount);
    } catch (error) {
        next(error);
    }
};

export const getMembers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const members = await User.find({ isMember: true })
            .select("-password") // Exclude the password field
            .sort({ createdAt: -1 });

        res.status(200).json(members);
    } catch (error) {
        next(error);
    }
};

export const getTithe = async (req, res, next) => {
  if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You must be a Admin to view tithes'));
  }  
  try {
    const tithes = await Tithe.find({ isApproved: false }).sort({ createdAt: -1 });
    res.status(200).json(tithes);
  } catch (error) {
    next(error);
    
  }
};

export const approveTithe = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const updatedTithe = await Tithe.findByIdAndUpdate(
            req.params.titheId,
            {
                $set: {
                    isApproved: true,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedTithe);
    } catch (error) {
        next(error);
    }
};


export const deleteTithe = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        await Tithe.findByIdAndDelete(req.params.titheId);
        res.status(200).json({ message: 'Tithe deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getTitheForUpdate = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const tithe = await Tithe.findById(req.params.titheId);
        res.status(200).json(tithe);
    } catch (error) {
        next(error);
    }
};

export const updateTithe = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const { amount, period, weekOrMonth, paymentForMonth, mode } = req.body;
        const updatedTithe = await Tithe.findByIdAndUpdate(
            req.params.titheId,
            {
                $set: {
                    amount,
                    period,
                    weekOrMonth,
                    paymentForMonth,
                    mode,
                    isApproved: true,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedTithe);
    } catch (error) {
        next(error);
    }
};

export const createTithe = async (req, res, next) => {
    if (!req.user.isMember || !req.user.isAdmin) {
        return next(errorHandler(403, 'You must be a member to create tithes'));
    }
    try {
        const { amount, period, weekOrMonth, paymentForMonth, mode, username, userID } = req.body;
        const newTithe = new Tithe({
            username,
            userID,
            amount,
            period,
            weekOrMonth,
            paymentForMonth,
            mode,
            isApproved: true,
        });
        await newTithe.save();
        res.status(200).json(newTithe);
    } catch (error) {
        next(error);
    }
};

export const getChurchRecord = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const churchRecord = await ChurchAccount.find().sort({ createdAt: -1 });
        res.status(200).json(churchRecord);
    } catch (error) {
        next(error);
    }
};

export const getClickedChurchRecord = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const clickedChurchRecord = await ChurchAccount.findById(req.params.churchAccountId);
        res.status(200).json(clickedChurchRecord);
    } catch (error) {
        next(error);
    }
};


export const updateChurchRecord = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const { userId, nameOfThoseWhoPaid, thanksgiving, welfare, communityImpact, sundayOfferingFirstService, sundayOfferingSecondService, sundayOfferingThirdService, childrenServiceOffering, sundaySchool, midWeekOffering, fridayPrayerOffering, ifAnySpecialOfferingSpecify } = req.body;
        const updatedChurchRecord = await ChurchAccount.findByIdAndUpdate(
            req.params.churchAccountId,
            {
                $set: {
                    userId,
                    nameOfThoseWhoPaid,
                    thanksgiving,
                    welfare,
                    communityImpact,
                    sundayOfferingFirstService,
                    sundayOfferingSecondService,
                    sundayOfferingThirdService,
                    childrenServiceOffering,
                    sundaySchool,
                    midWeekOffering,
                    fridayPrayerOffering,
                    ifAnySpecialOfferingSpecify,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedChurchRecord);
    } catch (error) {
        next(error);
    }
};

export const getAllTithe = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const tithes = await Tithe.find().sort({ createdAt: -1 });
        res.status(200).json(tithes);
    } catch (error) {
        next(error);
    }
};

export const updateTitheRecord = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const { amount } = req.body;
        const updatedTithe = await Tithe.findByIdAndUpdate(
            req.params.titheId,
            {
                $set: {
                    amount,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedTithe);
    } catch (error) {
        next(error);
    }
};

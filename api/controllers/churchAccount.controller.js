import ChurchAccount from '../models/churchAccount.model.js'
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
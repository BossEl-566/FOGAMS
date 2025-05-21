import Tithe from '../models/tithe.model.js';
import { errorHandler } from '../utils/error.js';


export const createTithe = async (req, res, next) => {
    try {
        const { amount, period, weekOrMonth, paymentForMonth, mode, userID, username } = req.body;

        if(!amount || !period || !paymentForMonth || !mode) {
            return next(errorHandler(400, 'All fields are required'));
        }

        if(!req.user.isMember) {
            return next(errorHandler(403, 'You must be a member to pay tithe'));
        }
    
        const newTithe = new Tithe({
        username,
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
    if (!req.user.isMember) {
        return next(errorHandler(403, 'You must be a member to view tithes'));
    }
    try {
        const tithes = await Tithe.find({ userID: req.user.id }).sort({ createdAt: -1 });
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

export const editTithe = async (req, res, next) => {
    if(!req.user.isMember || !req.user.isAdmin) {
        return next(errorHandler(403, 'You must be a member to edit tithes'));
    }
    try {
        const
        { amount, period, weekOrMonth, paymentForMonth, mode } = req.body
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

        if(!updatedTithe) {
            return next(errorHandler(404, 'Tithe not found'));
        }

        res.status(200).json(updatedTithe);
        
    } catch (error) {
        next(error);
        
    }
};

export const requestEditTithe = async (req, res, next) => {
    if (!req.user.isMember) {
      return next(errorHandler(403, 'You must be a member to request edit tithes'));
    }
  
    try {
      const tithe = await Tithe.findById(req.params.titheId);
  
      if (!tithe) {
        return next(errorHandler(404, 'Tithe not found'));
      }
  
      // Toggle the value
      tithe.requestEdit = !tithe.requestEdit;
      await tithe.save();
  
      res.status(200).json({
        success: true,
        message: `Edit request is now ${tithe.requestEdit ? 'enabled' : 'disabled'}`,
        requestEdit: tithe.requestEdit
      });
  
    } catch (error) {
      next(error);
    }
  };
  


  export const approveEditTithe = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, 'You must be a member to approve edit tithes'));
    }

    try {
        const tithe = await Tithe.findById(req.params.titheId);

        if (!tithe) {
            return next(errorHandler(404, 'Tithe not found'));
        }

        // Toggle the requestApprove value
        tithe.requestApprove = !tithe.requestApprove;
        await tithe.save();

        res.status(200).json({
            success: true,
            message: `Approve request is now ${tithe.requestApprove ? 'enabled' : 'disabled'}`,
            requestApprove: tithe.requestApprove
        });

    } catch (error) {
        next(error);
    }
};


import bcryptjs from 'bcryptjs';
import e from 'express';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'Welcome to FOGAMS API' });
};

export const updateUser = async (req, res, next) => {
  
  if (req.user.id !== req.params.userId && !req.user.isAdmin) {
    return next(errorHandler(403, 'You are not authorized to perform this action'));
  }
  if (req.body.password) {
    
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters long'));
    }
    req.body.password = await bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, 'Username must be between 7 and 20 characters long'));
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if(req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be in lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, 'Username can only contain letters and numbers'));
    }
  }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      }, { new: true });
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest); 
    } catch (error) {
      console.error(error);
      return next(errorHandler(400, 'Username already exists'));
      
    }
   };

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not authorized to perform this action'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User has been deleted' });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
 try {
  res.clearCookie('access_token').status(200).json({ message: 'User has been signed out' });
 } catch (error) {
   next(error);
  
 }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not authorized to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const userWithoutPassword = users.map(user => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    // Get the count of users created in the last month
    const totalLastMonthUsers = await User.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({
      users: userWithoutPassword,
      totalUsers: totalUsers,
      totalLastMonthUsers: totalLastMonthUsers, // Return the count only
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
    
  }
};

export const updateMemberUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to perform this action"));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          isMember: true, 
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ message: "User membership updated successfully" });
  } catch (error) {
    next(error);
  }
};

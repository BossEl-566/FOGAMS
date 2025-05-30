import express from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; 
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }
    const hashedPassword = bcryptjs.hashSync(password , 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,  
    });
   

    try {
        await newUser.save();
        res.json({ message: 'User created successfully' });
    }
    catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '') {
        return next(errorHandler(400, 'All fields are required'));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        } 
        const validPassword = bcryptjs.compareSync(password, validUser.password); 
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid credentials'));
        }
        const token = jwt.sign({ id: validUser._id, 
            isMember: validUser.isMember,
            isAdmin: validUser.isAdmin,
            isDeptHead: validUser.isDeptHead,
            isPastor: validUser.isPastor }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true
          }).json({ ...rest, token });
            
    } catch (error) {
        return next(errorHandler(500, 'Internal Server Error')); 
    }
}

export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id, isMember: user.isMember, isAdmin: user.isAdmin, isDeptHead: user.isDeptHead, isPastor: user.isPastor }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            return res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest);  
        } else {
            const generatedPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, isMember: newUser.isMember, isAdmin: newUser.isAdmin, isDeptHead: newUser.isDeptHead, isPastor: newUser.isPastor }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            return res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest);
        }
    } catch (error) {
        return next(error);
    }
};
// controllers/newmember.controller.js
import NewMember from "../models/newmember.model.js";
import { errorHandler } from "../utils/error.js";

// Add new member
export const addNewMember = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    try {
        const { 
            name, 
            phone, 
            email, 
            interestedInMembership, 
            residence, 
            maritalStatus, 
            occupation, 
            howDidYouHearAboutUs,
            otherSource 
        } = req.body;    
        
        // Validate required fields
        if (!name || !phone || !email || !residence || !maritalStatus || !occupation || !howDidYouHearAboutUs) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }
        
        // If "Other" is selected but no otherSource provided
        if (howDidYouHearAboutUs === 'Other' && !otherSource) {
            return res.status(400).json({ message: "Please specify how you heard about us" });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        
        // Validate Ghana phone number format
        const phoneRegex = /^(0|\+233)[235]\d{8}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ 
                message: "Invalid Ghana phone number. Format: 0XXXXXXXXX or +233XXXXXXXXX" 
            });
        }
        
        // Check if email already exists
        const existingMember = await NewMember.findOne({ email });
        if (existingMember) {
            return res.status(409).json({ message: "Member with this email already exists" });
        }
        
        const newMember = new NewMember({
            name,
            phone,
            email,
            interestedInMembership: interestedInMembership || false,
            residence,
            maritalStatus,
            occupation,
            howDidYouHearAboutUs,
            otherSource: howDidYouHearAboutUs === 'Other' ? otherSource : ''
        });
        
        await newMember.save();
        res.status(201).json({ 
            message: "New member added successfully", 
            newMember 
        });
    } catch (error) {
        next(error);
    }
};

// Get all new members with optional filtering
export const getNewMembers = async (req, res, next) => {    
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    try {
        const { month, year, search } = req.query;
        let query = {};
        
        // Filter by month and year
        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);
            query.createdAt = {
                $gte: startDate,
                $lt: endDate
            };
        } else if (year) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(parseInt(year) + 1, 0, 1);
            query.createdAt = {
                $gte: startDate,
                $lt: endDate
            };
        }
        
        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { residence: { $regex: search, $options: 'i' } },
                { occupation: { $regex: search, $options: 'i' } }
            ];
        }
        
        const newMembers = await NewMember.find(query).sort({ createdAt: -1 });
        res.status(200).json(newMembers);
    } catch (error) {
        next(error);
    }
};

// Get single member by ID
export const getNewMemberById = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    try {
        const { id } = req.params;
        const member = await NewMember.findById(id);
        
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        
        res.status(200).json(member);
    } catch (error) {
        next(error);
    }
};

// Update member
export const updateNewMember = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    try {
        const { id } = req.params;
        const { 
            name, 
            phone, 
            email, 
            interestedInMembership, 
            residence, 
            maritalStatus, 
            occupation, 
            howDidYouHearAboutUs,
            otherSource 
        } = req.body;
        
        // Validate required fields
        if (!name || !phone || !email || !residence || !maritalStatus || !occupation || !howDidYouHearAboutUs) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }
        
        // If "Other" is selected but no otherSource provided
        if (howDidYouHearAboutUs === 'Other' && !otherSource) {
            return res.status(400).json({ message: "Please specify how you heard about us" });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        
        // Check if email already exists for another member
        const existingMember = await NewMember.findOne({ 
            email, 
            _id: { $ne: id } 
        });
        
        if (existingMember) {
            return res.status(409).json({ message: "Another member with this email already exists" });
        }
        
        const updatedMember = await NewMember.findByIdAndUpdate(
            id,
            {
                name,
                phone,
                email,
                interestedInMembership: interestedInMembership || false,
                residence,
                maritalStatus,
                occupation,
                howDidYouHearAboutUs,
                otherSource: howDidYouHearAboutUs === 'Other' ? otherSource : ''
            },
            { new: true, runValidators: true }
        );
        
        if (!updatedMember) {
            return res.status(404).json({ message: "Member not found" });
        }
        
        res.status(200).json({ 
            message: "Member updated successfully", 
            member: updatedMember 
        });
    } catch (error) {
        next(error);
    }
};

// Delete member
export const deleteNewMember = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    try {
        const { id } = req.params;
        const deletedMember = await NewMember.findByIdAndDelete(id);
        
        if (!deletedMember) {
            return res.status(404).json({ message: "Member not found" });
        }
        
        res.status(200).json({ 
            message: "Member deleted successfully" 
        });
    } catch (error) {
        next(error);
    }
};

// Get member statistics
export const getNewMemberStats = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    try {
        const stats = await NewMember.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 },
                    interestedInMembership: {
                        $sum: { $cond: [{ $eq: ["$interestedInMembership", true] }, 1, 0] }
                    }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } }
        ]);
        
        // Get total counts
        const totalMembers = await NewMember.countDocuments();
        const totalInterested = await NewMember.countDocuments({ interestedInMembership: true });
        
        // Group by marital status
        const maritalStats = await NewMember.aggregate([
            { $group: { _id: "$maritalStatus", count: { $sum: 1 } } }
        ]);
        
        // Group by how they heard about us
        const sourceStats = await NewMember.aggregate([
            { $group: { _id: "$howDidYouHearAboutUs", count: { $sum: 1 } } }
        ]);
        
        res.status(200).json({
            totalMembers,
            totalInterested,
            monthlyStats: stats,
            maritalStats,
            sourceStats
        });
    } catch (error) {
        next(error);
    }
};

// Export members to Excel (returns JSON data for frontend to convert)
export const exportNewMembers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    try {
        const { month, year } = req.query;
        let query = {};
        
        // Filter by month and year if provided
        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);
            query.createdAt = {
                $gte: startDate,
                $lt: endDate
            };
        } else if (year) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(parseInt(year) + 1, 0, 1);
            query.createdAt = {
                $gte: startDate,
                $lt: endDate
            };
        }
        
        const members = await NewMember.find(query).sort({ createdAt: -1 });
        
        // Format data for Excel
        const exportData = members.map(member => ({
            'Name': member.name,
            'Phone': member.phone,
            'Email': member.email,
            'Residence': member.residence,
            'Marital Status': member.maritalStatus,
            'Occupation': member.occupation,
            'Interested in Membership': member.interestedInMembership ? 'Yes' : 'No',
            'How did you hear about us': member.howDidYouHearAboutUs,
            'Other Source': member.otherSource || 'N/A',
            'Date Added': member.createdAt.toLocaleDateString('en-GB'),
            'Time Added': member.createdAt.toLocaleTimeString('en-GB')
        }));
        
        res.status(200).json(exportData);
    } catch (error) {
        next(error);
    }
};
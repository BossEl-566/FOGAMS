import Resource from "../models/resource.model.js";
import { errorHandler } from "../utils/error.js";

export const createResource = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));
    }
  if (!req.body.title || !req.body.description || !req.body.fileUrl) {
    return next(errorHandler(400, 'Title, description and fileUrl are required'));
  }  
    // Generate slug
    const slug = req.body.title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with dashes
        .replace(/[^a-z0-9-]/g, '')  // Remove special characters
        .replace(/--+/g, '-');       // Avoid multiple dashes

    const newResource = new Resource({
        ...req.body, slug, userId: req.user.id
    });

    try {
        const resource = await newResource.save();
        res.status(201).json(resource);
    } catch (error) {
        next(error);
    }
};


export const getResources = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const resources = await Resource.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.resourceId && { _id: req.query.resourceId }),
            ...(req.query.searchText && {
                $or: [
                    { title: { $regex: req.query.searchText, $options: 'i' } },
                    { description: { $regex: req.query.searchText, $options: 'i' } }
                ]
            }),
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalResources = await Resource.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const lastMonthResources = await Resource.find({
            createdAt: { $gte: oneMonthAgo }
        });
        res.status(200).json({ resources, totalResources, lastMonthResources: lastMonthResources.length });
        
    } catch (error) {
        next(error);
        
    }
};

export const deleteResource = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));
    }
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return next(errorHandler(404, 'Resource not found'));
        }
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        next(error);
    }
};
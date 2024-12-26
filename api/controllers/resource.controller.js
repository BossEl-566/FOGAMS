import Resource from "../models/resource.model.js";

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
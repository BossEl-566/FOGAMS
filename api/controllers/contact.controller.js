import Contact from "../models/contact.model.js";


export const createContact = async (req, res) => {
    try {
        const { name, email, message, subject } = req.body;

        // Validate the input
        if (!name || !email || !message || !subject) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new contact message
        const newContact = new Contact({ name, email, message, subject });
        await newContact.save();

        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

export const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

export const deleteContactMessage = async (req, res) => {
    // Check if the user is a pastor or admin
    if (!req.user.isPastor && !req.user.isAdmin) {
        return res.status(403).json({ error: 'You are not authorized to perform this action' });
    }
    try {
        const { messageId } = req.params;
        const deletedMessage = await Contact.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}
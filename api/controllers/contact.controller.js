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
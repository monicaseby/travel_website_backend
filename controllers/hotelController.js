// controllers/hotelController.js
const Hotel = require('../models/hotelModel');

const hotelController = {
    addHotel: async (req, res) => {
        try {
            const { hotelName, pricePerDay } = req.body;
            const image = req.file.filename;

            const newHotel = new Hotel({ hotelName, image, pricePerDay });
            await newHotel.save();
            res.status(201).json(newHotel);
        } catch (error) {
            res.status(500).json({ message: 'Error adding hotel', error: error.message });
        }
    },
    getHotels: async (req, res) => {
        try {
            const hotels = await Hotel.find();
            res.json(hotels);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching hotels', error: error.message });
        }
    },
    deleteHotel: async (req, res) => {
        try {
            await Hotel.findByIdAndDelete(req.params.id);
            res.json({ message: 'Hotel deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting hotel', error: error.message });
        }
    },
    updateHotel: async (req, res) => {
        try {
            const { hotelName, pricePerDay } = req.body;
            const updatedHotel = { hotelName, pricePerDay, updatedAt: Date.now() };

            if (req.file) {
                updatedHotel.image = req.file.filename;
            }

            const hotel = await Hotel.findByIdAndUpdate(req.params.id, updatedHotel, { new: true });
            res.json(hotel);
        } catch (error) {
            res.status(500).json({ message: 'Error updating hotel', error: error.message });
        }
    },
    getHotel: async (req, res) => {
      try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
      } catch (error) {
          res.status(500).json({ message: 'Error fetching hotel', error: error.message });
      }
    }
};

module.exports = hotelController;

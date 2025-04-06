const Booking = require('../models/BookingModel'); 

exports.addBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        const formattedBookings = bookings.map(booking => {
            let formattedDate = booking.date;
            if (booking.date) {
                formattedDate = booking.date.toISOString().slice(0, 10);
            }
            return { ...booking.toObject(), date: formattedDate };
        });
        res.json(formattedBookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log('Updating booking ID:', id, 'with status:', status); 

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBooking) {
            console.log('Booking not found for ID:', id); 
            return res.status(404).json({ message: 'Booking not found' });
        }
        console.log('Booking updated successfully:', updatedBooking); 
        res.status(200).json({ message: 'Booking status updated successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Failed to update booking status', error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Failed to delete booking', error: error.message });
    }
};
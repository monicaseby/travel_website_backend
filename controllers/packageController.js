const Package = require('../models/packageModel');

exports.getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPackage = async (req, res) => {
    try {
        const packageItem = await Package.findById(req.params.id);
        if (!packageItem) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(packageItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addPackage = async (req, res) => {
    try {
        const newPackage = new Package({
            tourpackageName: req.body.tourpackageName,
            image: req.file.filename,
            price: req.body.price,
            duration: req.body.duration,
        });

        await newPackage.save();
        res.status(201).json({ message: 'Package added successfully!', package: newPackage });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ message: 'Package deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const packageData = {
            tourpackageName: req.body.tourpackageName,
            price: req.body.price,
            duration: req.body.duration,
        };
        if (req.file) {
            packageData.image = req.file.filename;
        }

        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, packageData, { new: true });
        res.json(updatedPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
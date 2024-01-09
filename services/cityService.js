const City = require('../models/City');

const createCity = async (cityData) => {
    return await City.create(cityData);
};

const getAllCities = async () => {
    return await City.find().populate('state', 'name'); // Populate the 'state' field with only the 'name' property
};

const getCityById = async (cityId) => {
    return await City.findById(cityId).populate('state', 'name');
};

const updateCityById = async (cityId, updatedData) => {
    return await City.findByIdAndUpdate(cityId, updatedData, { new: true });
};

const deleteCityById = async (cityId) => {
    return await City.findByIdAndDelete(cityId);
};

module.exports = {
    createCity,
    getAllCities,
    getCityById,
    updateCityById,
    deleteCityById,
};
const Country = require('../models/Country');

const createCountry = async (countryData) => {
    console.log("countryData==>", countryData);
    return await Country.create(countryData);
};

const getAllCountries = async () => {
    return await Country.find();
};

const getCountryById = async (countryId) => {
    return await Country.findById(countryId);
};

const updateCountryById = async (countryId, updatedData) => {
    return await Country.findByIdAndUpdate(countryId, updatedData, { new: true });
};

const deleteCountryById = async (countryId) => {
    return await Country.findByIdAndDelete(countryId);
};

module.exports = {
    createCountry,
    getAllCountries,
    getCountryById,
    updateCountryById,
    deleteCountryById,
};
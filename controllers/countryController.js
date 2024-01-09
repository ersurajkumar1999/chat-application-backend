const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { getAllCountries, createCountry } = require("../services/countryServices");

const getCountries = async (req, res) => {
    try {
        const countries = await getAllCountries();
        return successResponseMessage(res, "Get all countries!", countries)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const create = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name){
            return errorResponseMessage(res, "Country Name is required!");
        }
        const country = await createCountry({name});
        return successResponseMessage(res, "Country created successfully!", country)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = {
    getCountries,
    create
}
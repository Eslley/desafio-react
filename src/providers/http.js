import axios from "axios";

const http = axios.create()

export default {
    getCountries:() => {
        return axios.get("https://amazon-api.sellead.com/country")
    },

    getCities:() => {
        return axios.get("https://amazon-api.sellead.com/city")
    }
}
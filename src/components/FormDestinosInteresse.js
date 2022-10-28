import { Box, Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useEffect, useState } from "react";
import apiServices from "../providers/http"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, countryName) {
    return {
        fontWeight:
            countryName.indexOf(name) === -1
                ? "400"
                : "500",
    };
}

function FormDestinosInteresse({ formData, setFormData, countryName, setCountryName, cityName, setCityName }) {

    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])


    useEffect(() => {
        apiServices.getCountries()
            .then(res => {
                setCountries(res.data)
            })
            .catch(err => console.log(err))

        apiServices.getCities()
            .then(res => {
                setCities(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChangeCountry = (event) => {
        const {
            target: { value },
        } = event;
        setCountryName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    const handleChangeCity = (event) => {
        const {
            target: { value },
        } = event;
        setCityName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',')[0] : value,
        )
    }

    function addCountry(e) {
        const data = e.target.dataset
        if(!(data.code in formData)) {    
            setFormData({ ...formData, [data.code]: {name: data.value, cities: []} })
        }
    }

    function addCity(e) {
        const data = e.target.dataset
        const countryName = data.value.split(',').pop().trim()
        if(data.countryCode in formData) {
            let verificaCidade = false
            formData[data.countryCode].cities.forEach(city => {
                if(city.cityId === data.cityId) {
                    let cidades = formData[data.countryCode].cities.filter((city) => city.cityId !== data.cityId)
                    setFormData({ ...formData, [data.countryCode]: { name: countryName, cities: cidades} })
                    verificaCidade = true
                    return
                }
            })
            if(!verificaCidade){
                let cidades = formData[data.countryCode].cities
                cidades.push(data)
                setFormData({ ...formData, [data.countryCode]: { name: countryName, cities: cidades} })
            } 
        } else {
            const cidades = [data]
            setFormData({ ...formData, [data.countryCode]: { name: countryName, cities: cidades} })
        }
    }

    return (
        <Grid container direction="column" textAlign="center">
            <Grid sx={{ marginY: "0.6em" }} item>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="paises-label">Países</InputLabel>
                    <Select
                        labelId="paises-label"
                        multiple
                        value={countryName}
                        onChange={handleChangeCountry}
                        input={<OutlinedInput id="select-multiple-chip" label="Países" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip color="primary" key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {countries.map((country, index) => (
                            <MenuItem
                                key={index}
                                value={country.name_ptbr}
                                data-code={country.code}
                                style={getStyles(country.name_ptbr, countryName)}
                                onClick={addCountry}
                            >
                                {country.name_ptbr}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid sx={{ marginY: "0.6em" }} item>
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="cidades-label">Cidades</InputLabel>
                    <Select
                        labelId="cidades-label"
                        multiple
                        value={cityName}
                        onChange={handleChangeCity}
                        input={<OutlinedInput id="select-multiple-chip" label="Cidades" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value,index) => (
                                    <Chip color="primary" key={index} label={value.split(',')[0]} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {cities.map((city, index) => (
                            <MenuItem
                                key={index}
                                value={city.name_ptbr}
                                data-city-id={city.id}
                                data-country-code={city.country_code}
                                data-lat={city.lat}
                                data-log={city.log}
                                style={getStyles(city.name_ptbr, cityName)}
                                onClick={addCity}
                            >
                                {city.name_ptbr}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default FormDestinosInteresse
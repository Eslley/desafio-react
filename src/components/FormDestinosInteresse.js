import { useTheme } from "@emotion/react";
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

function FormDestinosInteresse({ register, errors }) {

    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])

    const [countryName, setCountryName] = useState([])
    const [cityName, setCityName] = useState([])


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
                                style={getStyles(country.name_ptbr, countryName)}
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
                                style={getStyles(city.name_ptbr, cityName)}
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
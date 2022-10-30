import { Box, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useEffect, useState } from "react";
import apiServices from "../providers/http"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuPropsCountries = {
    anchorOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        },
    },
};
const MenuPropsCities = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        },
    },
};

function FormDestinosInteresse({
    formData,
    setFormData,
    countryName,
    setCountryName,
    cityName,
    setCityName,
    errorCities,
    setErrorCities,
    errorCountries,
    setErrorCountries }) {

    const [countries, setCountries] = useState([])

    const [cities, setCities] = useState([])
    const [filteredCities, setFilteredCities] = useState([])


    useEffect(() => {
        apiServices.getCountries()
            .then(res => {
                setCountries(res.data)
            })
            .catch(err => console.log(err))

        apiServices.getCities()
            .then(res => {
                //remove cidades que não tem atributos name_ptbr, lat ou log 
                let cities = res.data.filter((city) => {
                    return city.name_ptbr != null && city.lat != null && city.log != null
                })
                setCities(cities)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChangeCountry = (event) => {
        const {
            target: { value },
        } = event;

        setCountryName(
            typeof value === 'string' ? value.split(',') : value,
        )
        setErrorCountries('')
    }

    const handleChangeCity = (event) => {
        const {
            target: { value },
        } = event;
        setCityName(
            typeof value === 'string' ? value.split(',')[0] : value,
        )
        setErrorCities('')
    }

    function addCountry(e) {
        const data = e.target.dataset

        if (!(data.code in formData)) {
            //filtra as cidades do país selecionado
            let addCities = cities.filter((city) => city.country_code === data.code)
            addCities = addCities.concat(filteredCities)

            setFilteredCities(addCities)
            setFormData({ ...formData, [data.code]: { name: data.value, cities: [] } })
        } else {
            //remove as cidades do país que saiu da seleção
            let cities = filteredCities.filter((city) => city.country_code !== data.code)
            setFilteredCities(cities)
            let citiesNames = cityName.filter((city) => {
                let achou = false
                cities.forEach(element => {
                    if (city === element.name_ptbr)
                        achou = true
                })
                return achou
            })
            setCityName(citiesNames)
            let newFormData = { ...formData }
            delete newFormData[data.code]
            setFormData({ ...newFormData })
        }
    }

    function addCity(e) {
        const data = e.target.dataset
        const countryName = data.value.split(',').pop().trim()
        if (data.countryCode in formData) {
            let verificaCidade = false
            formData[data.countryCode].cities.forEach(city => {
                if (city.cityId === data.cityId) {
                    let cidades = formData[data.countryCode].cities.filter((city) => city.cityId !== data.cityId)
                    setFormData({ ...formData, [data.countryCode]: { name: countryName, cities: cidades } })
                    verificaCidade = true
                    return
                }
            })
            if (!verificaCidade) {
                let cidades = formData[data.countryCode].cities
                cidades.push(data)
                setFormData({ ...formData, [data.countryCode]: { name: countryName, cities: cidades } })
            }
        } else {
            const cidades = [data]
            setFormData({ ...formData, [data.countryCode]: { name: countryName, cities: cidades } })
        }
    }

    return (
        <Grid container direction="column" textAlign="center">
            <Grid item>
                <FormControl sx={{ m: 1, width: 300 }} error={errorCountries !== ''}>
                    <InputLabel id="paises-label">Países</InputLabel>
                    <Select
                        labelId="paises-label"
                        multiple
                        value={countryName}
                        onChange={handleChangeCountry}
                        input={<OutlinedInput id="select-multiple-chip" label="Países" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, zIndex: 999 }}>
                                {selected.map((value) => (
                                    <Chip onDelete={handleChangeCountry} color="primary" key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuPropsCountries}
                        error={errorCountries !== ''}
                    >
                        {countries.map((country, index) => (
                            <MenuItem
                                key={index}
                                value={country.name_ptbr}
                                data-code={country.code}
                                sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                                onClick={addCountry}
                            >
                                {country.name_ptbr}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errorCountries !== '' && errorCountries}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid sx={{ marginY: "0.6em" }} item>
                <FormControl sx={{ m: 1, width: 300 }} error={errorCities !== ''}>
                    <InputLabel id="cidades-label">Cidades</InputLabel>
                    <Select
                        labelId="cidades-label"
                        multiple
                        value={cityName}
                        onChange={handleChangeCity}
                        input={<OutlinedInput id="select-multiple-chip" label="Cidades" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value, index) => (
                                    <Chip color="primary" key={index} label={value.split(',')[0]} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuPropsCities}
                        error={errorCities !== ''}
                    >
                        {filteredCities.length > 0 ? filteredCities.map((city, index) => (
                            <MenuItem
                                key={index}
                                value={city.name_ptbr}
                                data-city-id={city.id}
                                data-country-code={city.country_code}
                                data-lat={city.lat}
                                data-log={city.log}
                                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                                onClick={addCity}
                            >
                                {city.name_ptbr}
                            </MenuItem>
                        )) : 
                            <MenuItem disabled>
                                Sem cidades
                            </MenuItem>
                        }
                    </Select>
                    <FormHelperText>{errorCities !== '' && errorCities}</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default FormDestinosInteresse
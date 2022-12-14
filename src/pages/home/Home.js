import { ArrowBack, ClearAll, List, Save } from "@mui/icons-material"
import { Fab, Grid, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useForm } from "react-hook-form"
import CardForm from "../../components/CardForm"
import FormDadosPessoais from "../../components/FormDadosPessoais"
import FormDestinosInteresse from "../../components/FormDestinosInteresse"
import { useAlertMessage } from "../../components/AlertMessageProvider"
import TableUsers from "../../components/TableUsers"
import { useToastMessage } from "../../components/ToastMessageProvider"
import { Link } from "react-router-dom"
import logo from "../../assets/img/logo_ally.png"

const defaultValues = {
    name: "",
    email: "",
    cell: "",
    cpf: ""
}

function Home() {

    const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange' })
    const onSubmit = data => {
        const localData = { ...data, places: formData }
        if (!validateSelects()) {
            showToast('O formulário contém erros!', 4000)
            return
        }
        saveLocalStorage(localData)
    }

    function validateSelects() {
        let validate = true

        if (countryName.length === 0) {
            setErrorCountries('Informe os países de interesse')
            validate = false
        }

        if (cityName.length === 0) {
            setErrorCities('Informe as cidades de interesse')
            validate = false
        }

        return validate
    }

    const [formData, setFormData] = useState({})

    const [countryName, setCountryName] = useState([])
    const [cityName, setCityName] = useState([])

    const { showAlert } = useAlertMessage()
    const { showToast } = useToastMessage()

    const [errorCities, setErrorCities] = useState('')
    const [errorCountries, setErrorCountries] = useState('')

    const [filteredCities, setFilteredCities] = useState([])

    function resetForm() {
        reset(defaultValues)
        setErrorCities('')
        setErrorCountries('')
        setFormData({})
        setCountryName([])
        setCityName([])
        setFilteredCities([])
    }

    function saveLocalStorage(data) {
        let localData = JSON.parse(localStorage.getItem("users"))

        if (localData == null) {
            localData = [data]
        } else {
            localData.push(data)
        }

        localStorage.setItem("users", JSON.stringify(localData))
        resetForm()
        showAlert('', 'Informações salvas com sucesso!', 'success', 4000)
    }

    return (
        <>
        <Box textAlign="center" mb="2em">
            <img width="190" alt="logo Ally Hub" src={logo} />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container >

                <Grid item container mb="1em" justifyContent="center" xs={12} md={6}>
                    <CardForm title="Dados Pessoais" content={
                        <FormDadosPessoais register={register} errors={errors} />
                    } />
                </Grid>

                <Grid item container mb="1em" justifyContent="center" xs={12} md={6}>
                    <CardForm title="Destinos de Interresse" content={
                        <FormDestinosInteresse
                            formData={formData}
                            setFormData={setFormData}
                            countryName={countryName}
                            setCountryName={setCountryName}
                            cityName={cityName}
                            setCityName={setCityName}
                            errorCities={errorCities}
                            setErrorCities={setErrorCities}
                            errorCountries={errorCountries}
                            setErrorCountries={setErrorCountries}
                            filteredCities={filteredCities}
                            setFilteredCities={setFilteredCities} />
                    } />
                </Grid>

            </Grid>


            <Grid container justifyContent="center">
                <Grid item container justifyContent="center" xs={5} sm={3} md={2}>
                    <Box sx={{ mt: '2em' }}>
                        <Fab onClick={resetForm} variant="extended" color="primary" aria-label="add">
                            <ClearAll />
                            Limpar
                        </Fab>
                    </Box>
                </Grid>

                <Grid item container justifyContent="center" xs={5} sm={3} md={2}>
                    <Box sx={{ mt: '2em' }}>
                        <Fab type="submit" variant="extended" color="primary" aria-label="add">
                            <Save />
                            Salvar
                        </Fab>
                    </Box>
                </Grid>

                <Grid item container justifyContent="center" xs={12}>
                    <Box sx={{ mt: '1em' }}>
                        <Tooltip title="Exibir usuários cadastrados" arrow>
                            <Link style={{textDecoration: 'none'}} to='/desafio-react/users'>
                            <Fab variant="extended" color="primary" aria-label="add">
                                <List />
                                Listar
                            </Fab>
                            </Link>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </form>
        </>
    )
}

export default Home
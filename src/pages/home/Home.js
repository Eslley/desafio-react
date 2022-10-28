import { ClearAll, Save } from "@mui/icons-material"
import { Fab, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useForm } from "react-hook-form"
import CardForm from "../../components/CardForm"
import FormDadosPessoais from "../../components/FormDadosPessoais"
import FormDestinosInteresse from "../../components/FormDestinosInteresse"
import { useAlertMessage } from "../../components/AlertMessageProvider"

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
        saveLocalStorage(localData)
    }

    const [formData, setFormData] = useState({})

    const [countryName, setCountryName] = useState([])
    const [cityName, setCityName] = useState([])

    const { showAlert } = useAlertMessage()

    function resetForm() {
        reset(defaultValues)
        setFormData({})
        setCountryName([])
        setCityName([])
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
                            setCityName={setCityName} />
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
                    <Box disabled={errors.name} sx={{ mt: '2em' }}>
                        <Fab type="submit" variant="extended" color="primary" aria-label="add">
                            <Save />
                            Salvar
                        </Fab>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default Home
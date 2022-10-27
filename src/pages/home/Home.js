import { ClearAll, Save } from "@mui/icons-material"
import { Fab, Grid, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CardForm from "../../components/CardForm"
import FormDadosPessoais from "../../components/FormDadosPessoais"

const defaultValues = {
    name: "",
    email: "",
    cell: "",
    cpf: ""
}

function Home() {

    const { register, formState: { errors }, handleSubmit, reset } = useForm({mode: 'onChange'})
    const onSubmit = data => console.log(data)

    function resetForm() {
        reset(defaultValues)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container >
            
                <Grid item container mb="1em" justifyContent="center" xs={12} md={6}>
                    <CardForm title="Dados Pessoais" content={
                        <FormDadosPessoais register={register} errors={errors} />
                    } />
                </Grid>

                <Grid item container justifyContent="center" xs={12} md={6}>
                    {/* Form de destinos */}
                </Grid>
                
            </Grid>
           

            <Grid container justifyContent="center">
                <Grid item container justifyContent="center" mb="1em" xs={5} sm={3} md={2}>
                    <Box sx={{ mt: '2em' }}>
                        <Fab onClick={resetForm} variant="extended" color="primary" aria-label="add">
                            <ClearAll />
                            Limpar
                        </Fab>
                    </Box>
                </Grid>

                <Grid item container justifyContent="center" mb="1em" xs={5} sm={3} md={2}>
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
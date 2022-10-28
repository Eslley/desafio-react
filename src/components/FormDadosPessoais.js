import { AccountCircle, Description, Email, Phone } from "@mui/icons-material"
import { Grid, InputAdornment, TextField } from "@mui/material"
import { useEffect } from "react"
import util from "../providers/util"

function Form({ register, errors }) {

    const maskCell = (e) => {
        e.target.value = util.maskCell(e.target.value)
    }

    const maskCPF = (e) => {
        e.target.value = util.maskCPF(e.target.value)
    }

    return (

        <Grid container direction="column" textAlign="center">
            <Grid item>
                <TextField
                    margin='normal'
                    sx={{ width: 300 }}
                    label="Nome"
                    type="text"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle color="primary" />
                            </InputAdornment>
                        ),
                    }}
                    {...register("name", { required: true })}
                    helperText={errors.name ? "O nome é obrigatório" : ""}
                    error={!!errors.name}
                />
            </Grid>

            <Grid item>
                <TextField
                    margin='normal'
                    sx={{ width: 300 }}
                    label="Email"
                    type="email"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email color="primary" />
                            </InputAdornment>
                        ),
                    }}
                    {...register("email", {
                        required: true, pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido"
                        }
                    })}
                    helperText={errors.email?.type === 'required' ? "O email é obrigatório" : errors.email && errors.email.message}
                    error={!!errors.email}
                />
            </Grid>

            <Grid item>
                <TextField
                    margin='normal'
                    sx={{ width: 300 }}
                    label="Telefone"
                    type="tel"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Phone color="primary" />
                            </InputAdornment>
                        ),
                    }}
                    {...register("cell", {
                        required: true, pattern: {
                            value: /^\([0-9]{2}\)\s{0,1}[0-9]{4,5}\-[0-9]{4}$/,
                            message: "Telefone inválido"
                        }
                    })}
                    onInput={maskCell}
                    helperText={errors.cell?.type === 'required' ? "O telefone é obrigatório" : errors.cell && errors.cell.message}
                    error={!!errors.cell}
                />
            </Grid>

            <Grid item>
                <TextField
                    margin='normal'
                    sx={{ width: 300 }}
                    label="CPF"
                    type="text"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Description color="primary" />
                            </InputAdornment>
                        ),
                    }}
                    {...register("cpf", { required: true, pattern: {
                        value: /\d{3}\.\d{3}\.\d{3}\-\d{2}/,
                        message: "CPF inválido"
                    } })}
                    onInput={maskCPF}
                    helperText={errors.cpf?.type === 'required' ? "O CPF é obrigatório" : errors.cpf && errors.cpf.message}
                    error={!!errors.cpf}
                />

            </Grid>
        </Grid>
    )
}

export default Form
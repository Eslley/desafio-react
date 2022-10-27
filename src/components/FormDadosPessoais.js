import { Grid, TextField } from "@mui/material"
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
            <Grid sx={{ marginY: "0.6em" }} item>
                <TextField
                    sx={{ width: "90%" }}
                    label="Nome"
                    type="text"
                    {...register("name", { required: true})}
                    helperText={errors.name ? "O nome é obrigatório" : ""}
                    error={!!errors.name}
                />
            </Grid>

            <Grid sx={{ marginY: "0.6em" }} item>
                <TextField
                    sx={{ width: "90%" }}
                    label="Email"
                    type="email"
                    {...register("email", { required: true, pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                      }})}
                    helperText={errors.email?.type === 'required' ? "O email é obrigatório" : errors.email && errors.email.message}
                    error={!!errors.email}
                />
            </Grid>

            <Grid sx={{ marginY: "0.6em" }} item>
                <TextField
                    sx={{ width: "90%" }}
                    label="Telefone"
                    type="tel"
                    {...register("cell", { required: true, pattern: {
                        value: /^\([0-9]{2}\)\s{0,1}[0-9]{4,5}\-[0-9]{4}$/,
                        message: "Telefone inválido"
                      }})}
                    onInput={maskCell}
                    helperText={errors.cell?.type === 'required' ? "O telefone é obrigatório" : errors.cell && errors.cell.message}
                    error={!!errors.cell}
                />
            </Grid>

            <Grid sx={{ marginY: "0.6em" }} item>
                <TextField
                    sx={{ width: "90%" }}
                    label="CPF"
                    type="text"
                    {...register("cpf", { required: true, pattern: /\d{3}\.\d{3}\.\d{3}\-\d{2}/g })}
                    onInput={maskCPF}
                    helperText={errors.cpf ? "O CPF é obrigatório" : ""}
                    error={!!errors.cpf}
                />

            </Grid>
        </Grid>
    )
}

export default Form
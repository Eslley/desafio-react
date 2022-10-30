import { ArrowBack } from "@mui/icons-material"
import { Box, Fab, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import TableUsers from "../../components/TableUsers"

function Users() {
    return (
        <>
            <TableUsers />
            <Link style={{textDecoration: 'none'}} to='/desafio-react'>
                <Grid item container justifyContent="center" xs={12}>
                    <Box sx={{ mt: '1em' }}>
                        <Fab variant="extended" color="primary" aria-label="add">
                            <ArrowBack />
                            Voltar
                        </Fab>
                    </Box>
                </Grid>
            </Link>
        </>
    )
}

export default Users
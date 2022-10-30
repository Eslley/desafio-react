import { Block } from "@mui/icons-material"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import Map from "./Map"
import { useToastMessage } from "./ToastMessageProvider"

function TableUsers() {

    const [users, setUsers] = useState([])
    const [indexUser, setIndexUser] = useState()
    const [open, setOpen] = useState(false)
    const { showToast } = useToastMessage()

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("users"))

        if (localData && localData.length > 0) {
            setTimeout(() => {
                showToast('Clique na célula para exibir os destinos de interesse!', 5000)
            }, 3000)
            setUsers(localData)
        }
    }, [])

    function openModal(index) {
        setOpen(true)
        setIndexUser(index)
    }

    return (
        <>
            {users.length > 0 ?
                <TableContainer sx={{ overflowX: 'hidden' }} component={Paper}>
                    <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Telefone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow
                                    sx={{ ":hover": { backgroundColor: "rgba(51, 153, 255, 0.2)" }, cursor: "pointer" }}
                                    key={index}
                                    onClick={() => openModal(index)}>
                                    <TableCell align="center">
                                        {user.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {user.email}
                                    </TableCell>
                                    <TableCell align="center">
                                        {user.cell}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <Box sx={{ fontSize: '2em' }} textAlign="center" color="white">
                    <Block sx={{ fontSize: '90px' }} />
                    <p>Não há usuários cadastrados!</p>
                </Box>
            }

            <Map user={users[indexUser]} open={open} setOpen={setOpen} />

        </>
    )
}

export default TableUsers
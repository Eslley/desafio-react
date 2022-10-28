import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import Map from "./Map"

function TableUsers() {

    const [users, setUsers] = useState([])
    const [indexUser, setIndexUser] = useState()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("users"))

        if (localData.length > 0) {
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
                                    <TableCell component="th" scope="row">
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
                : <p>Não há usuários cadastrados!</p>}

                <Map user={users[indexUser]} open={open} setOpen={setOpen} />

        </>
    )
}

export default TableUsers
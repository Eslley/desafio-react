import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"

function TableUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("users"))

        if (localData.length > 0) {
            setUsers(localData)
            console.log(localData)
        }
    }, [])

    function openModal(user) {
        console.log(user)
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
                                    onClick={() => openModal(user)}>
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
        </>
    )
}

export default TableUsers
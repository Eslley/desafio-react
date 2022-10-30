import { Box, Modal, Typography } from "@mui/material"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};

function Map({ open, setOpen, user }) {

    const handleClose = () => setOpen(false)

    return (
        <>
            {user &&
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography color="#5E6C84" id="modal-modal-title" textAlign='center' variant="h6" component="h2">
                            Destinos de {user.name}
                        </Typography>
                        <MapContainer
                            style={{
                                width: '100%',
                                height: '80vh'
                            }} center={[20, 0]} zoom={2} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {Object.entries(user.places).map((item) => (
                                item[1].cities.map((city, index) => (
                                    <Marker key={index} position={[city.lat, city.log]}>
                                        <Popup>
                                            {city.value.split(',')[0]} <br /> {item[1].name}
                                        </Popup>
                                    </Marker>
                                ))
                            ))}

                        </MapContainer>
                    </Box>
                </Modal>
            }
        </>
    )
}

export default Map
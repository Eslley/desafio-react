import { Box, Card, CardContent, Typography } from "@mui/material"

function CardForm({ title, content }) {
    return (
        <Box sx={{ minWidth: 350, minHeight: 200 }}>
            <Card style={{ height: '100%', paddingTop: '0.5em' }} variant="outlined">
                <CardContent>
                    <Typography sx={{ color: "#5E6C84",  textAlign: 'center', mb: '1em' }} fontSize="20px" variant="h5" component="div">
                        {title}
                    </Typography>
                    {content}
                </CardContent>
            </Card>
        </Box>
    )
}

export default CardForm
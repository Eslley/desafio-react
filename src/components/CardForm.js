import { Box, Card, CardContent, Typography } from "@mui/material"

function CardForm({ title, content }) {
    return (
        <Box sx={{ minWidth: 350 }}>
            <Card style={{ height: '100%' }} variant="outlined">
                <CardContent>
                    <Typography sx={{ textAlign: 'center', mb: '1em' }} fontSize="20px" variant="h5" component="div">
                        {title}
                    </Typography>
                    {content}
                </CardContent>
            </Card>
        </Box>
    )
}

export default CardForm
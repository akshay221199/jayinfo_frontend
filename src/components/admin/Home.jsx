import React from 'react'
import { Container, Typography, Divider, CardMedia, Paper } from '@mui/material'
import icon from '../images/icon.jpeg'

export const Home = () => {
    return (
        <Container component='main' >
            <Typography variant='h3' align='center' gutterBottom>
                Welcome to Jay-Info-Tech
            </Typography>
            <Divider />
            <Paper sx={{ width: '70rem', marginLeft: 13, marginTop: 3 }} >

                <CardMedia
                    component="img"
                    height="200"
                    image={icon} // Use the imported icon here
                    alt="JayInfo-Icon"
                    sx={{ objectFit: 'contain', padding: 2 }}
                />
                <Typography variant='h6' sx={{padding:3}}  >
                    This is a sample website for Jay-Info-Tech. It is a place where you can
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique dolorum 
                    numquam aut itaque iste odio ducimus rem, enim reprehenderit magni molestias
                     sed laudantium temporibus deleniti animi vel assumenda tempore odit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus 
                    architecto esse, obcaecati ducimus totam tenetur voluptatum. Vitae in 
                    eveniet ad ipsa! Unde cumque quam iusto, odit porro sapiente quod quibusdam?
                </Typography>
            </Paper>
        </Container>
    )
}

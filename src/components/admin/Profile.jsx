import React from 'react'
import {Container, Card, Typography, Box, TextField, Button} from '@mui/material'

export const Profile = () => {
  return (
    <Container component='main' maxWidth='sm'>
       <Card sx={{padding:3, margin:3, boxShadow:3}}>
           <Typography variant="h5" align='center' gutterBottom>
                    Hello User
           </Typography>
            <Box>
                <Typography>
                    <TextField 
                        label='Name'
                        type='text'
                        variant='outlined'
                        fullWidth
                         margin='normal'
                    />
                </Typography>

                <Typography>
                    <TextField 
                        label='Email'
                        type='email'
                        variant='outlined'
                        fullWidth
                         margin='normal'
                    />
                </Typography>

                <Typography>
                    <TextField 
                        label='Contact'
                        type='number'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                    />
                </Typography>


                <Button variant='contained'  color='primary' fullWidth sx={{margin:'normal', marginTop:2}}>
                    <Typography>
                        Update
                    </Typography>
                </Button>


            </Box>
       </Card>
    </Container>
  )
}

import React from 'react'
import {Box, Card, CardMedia, Container, Divider, Typography} from '@mui/material'


export const Service = () => {
  return (
    <Container component='main' maxWidth='md'>
       <Card sx={{padding:2, }}>
        <Box>
            <Typography variant="h4" align='center' gutterBottom>
                Services We Provide
            </Typography>
            <Card sx={{width:'sm', display:'flex', justifyContent:'space-between'}}>
                <Typography variant='h6'>
                        All Hardware services
                </Typography>
            <CardMedia 
                component='img'
                height='180'
                image = 'https://nationalict.co.uk/wp-content/uploads/2017/04/MG_2299.jpg'
                alt='All hardware Services'
                sx={{objectFit:'contain', p:2 }}
            />    
             <Typography variant='h6'>
                        Laptop sell Dell Hp Lenovo
                </Typography>
             <CardMedia 
                component='img'
                height='180'
                image = 'https://th.bing.com/th/id/OIP.xY0vbiawHOkZHU6_l01X1AHaEL?rs=1&pid=ImgDetMain'
                alt='All hardware Services'
                sx={{objectFit:'contain', p:2 }}
            />   
            </Card>
                <Divider />
            <Card sx={{width:'sm', mt:2, display:'flex', justifyContent:'space-between'}}>
            <Typography variant='h6'>
                      Antivirus and all software installation
                </Typography>
            <CardMedia 
                component='img'
                height='180'
                image = 'https://th.bing.com/th/id/OIP.KMQFq-Q_5sHAJjPqbM_AugHaEK?rs=1&pid=ImgDetMain'
                alt='All hardware Services'
                sx={{objectFit:'contain', p:2 }}
            />    
            <Typography variant='h6'>
                        Pc selling
                </Typography>
             <CardMedia 
                component='img'
                height='180'
                image = 'https://th.bing.com/th/id/R.093fef255f6f1762881f5495d190ca5e?rik=KWI5Yj2p6TzRdA&riu=http%3a%2f%2fstatic.soposted.com%2fuploads%2f2018%2f02%2fAcer-aspire.jpg&ehk=3byy7%2bZhZcTJnhmtA9L%2bMQif%2bOBukkMX%2bWfBlaUeWGA%3d&risl=&pid=ImgRaw&r=0'
                alt='All hardware Services'
                sx={{objectFit:'contain', p:2 }}
            />   
            </Card>
        </Box>
       </Card>
    </Container>
  )
}

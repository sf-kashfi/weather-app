import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StyledCard } from '../../style/MaterialUIStyle';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Weather() {
    const [location, setLocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;


                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();
                    setLocation(data.city);
                },
                (err) => {
                    console.error(err);
                    setError('Geolocation is not enabled. Please enable to get the location.');
                }
            );
        } else {

            fetch('https://ipapi.co/json/')
                .then((response) => response.json())
                .then((data) => setLocation(data.city))
                .catch((err) => {
                    console.error(err);
                    setError('Unable to retrieve location.');
                });
        }
    }, []);

    return (
        <StyledCard>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <div>
                    {location ? (
                        <p>Your city: {location}</p>
                    ) : (
                        <p>{error || 'Getting location...'}</p>
                    )}
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </StyledCard>
    );
}

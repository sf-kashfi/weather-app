import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { StyledCard } from "../../style/MaterialUIStyle";
import {
  useReverseGeocodeQuery,
  useIpGeolocationQuery,
} from "../../services/geolocationApi";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Weather() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: geocodeData, error: geocodeError } = useReverseGeocodeQuery(
    { latitude: latitude!, longitude: longitude! },
    { skip: latitude === null || longitude === null }
  );

  const { data: ipData, error: ipError } = useIpGeolocationQuery(undefined, {
    skip: latitude !== null && longitude !== null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          console.error(err);
          setError(
            "Geolocation is not enabled. Please enable to get the location."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (geocodeError) {
      console.error(geocodeError);
      setError("Failed to fetch city from coordinates.");
    }
  }, [geocodeError]);

  useEffect(() => {
    if (ipError) {
      console.error(ipError);
      setError("Unable to retrieve location.");
    }
  }, [ipError]);

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
          {geocodeData ? (
            <p>Your city: {geocodeData.city || "Unknown city"}</p>
          ) : ipData ? (
            <p>Your city: {ipData.city || "Unknown city"}</p>
          ) : (
            <p>{error || "Getting location..."}</p>
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </StyledCard>
  );
}

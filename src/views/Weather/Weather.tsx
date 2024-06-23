import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { StyledCard, StyledCardContent } from "../../style/MaterialUIStyle";
import {
  useReverseGeocodeQuery,
  useIpGeolocationQuery,
} from "../../services/geolocationApi";
import {
  useCurrentWeatherQuery,
  useForecastWeatherQuery,
} from "../../services/weatherApi";
import { Grid, Typography } from "@mui/material";

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
  const [location, setLocation] = useState<string | null>(null);
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

  useEffect(() => {
    if (geocodeData) {
      setLocation(geocodeData.city);
    } else if (ipData) {
      setLocation(ipData.city);
    }
  }, [geocodeData, ipData]);

  const { data: currentWeather, error: weatherError } = useCurrentWeatherQuery(
    { location },
    { skip: location === null }
  );

  const { data: forecastWeather, error: forecastError } =
    useForecastWeatherQuery({ location }, { skip: location === null });

  const formatDate = (): string => {
    if (!currentWeather) return "";

    const monthNames: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const lastUpdatedDate = new Date(currentWeather.current.last_updated);

    const day: number = lastUpdatedDate.getDate();
    const month: string = monthNames[lastUpdatedDate.getMonth()];
    const year: number = lastUpdatedDate.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  if (currentWeather) console.log("currentWeather", currentWeather);
  if (weatherError) console.log("weatherError", weatherError);
  if (forecastWeather) console.log("forecastWeather", forecastWeather);
  if (forecastError) console.log("forecastError", forecastError);

  return (
    <StyledCard>
      <StyledCardContent>
        {location ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography> {location || "Unknown city"}</Typography>
              <Typography>
                {`${formatDate()}` || forecastWeather || "..."}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{currentWeather?.current.temp_c}&deg;</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{currentWeather?.current.condition.text}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {currentWeather?.current.dewpoint_c}&deg;/
                {currentWeather?.current.heatindex_c}&deg;
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography> {error || "Getting location..."}</Typography>
        )}
      </StyledCardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </StyledCard>
  );
}

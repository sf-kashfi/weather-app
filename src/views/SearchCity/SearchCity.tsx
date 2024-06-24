import { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import { BootstrapInput } from "../../style/MaterialUIStyle";
import {
  useReverseGeocodeQuery,
  useIpGeolocationQuery,
} from "../../services/geolocationApi";
import {
  useCurrentWeatherQuery,
  useForecastWeatherQuery,
} from "../../services/weatherApi";
import { Button, CardHeader, Grid, Typography } from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { Formik } from "formik";

export default function SearchCity() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  interface ForecastDay {
    date: string;
    day: {
      condition: {
        code: number;
      };
      maxtemp_c: number;
      mintemp_c: number;
    };
  }

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

  const formatDay = (date: string): string => {
    if (!forecastWeather) return "";

    const weekNames: string[] = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const lastUpdatedDay = new Date(date);

    console.log(date);
    const dayIndex: number = lastUpdatedDay.getDay();

    return `${weekNames[dayIndex]}`;
  };

  const getIconByCode = (code: number): React.ReactElement<SvgIconProps> => {
    if (code >= 1000 && code <= 1100) {
      return <WbSunnyOutlinedIcon />;
    } else if (code >= 1101 && code <= 1200) {
      return <ThunderstormOutlinedIcon />;
    } else if (code >= 1201 && code <= 1300) {
      return <CloudOutlinedIcon />;
    } else {
      return <div></div>;
    }
  };

  if (weatherError) console.log("weatherError", weatherError);
  if (forecastError) console.log("forecastError", forecastError);

  return (
    <Formik
      initialValues={{ city: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.city) {
          errors.city = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <BootstrapInput
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
          {errors.city && touched.city && errors.city}

          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={isSubmitting}
          >
            Search
          </Button>
        </form>
      )}
    </Formik>
  );
}

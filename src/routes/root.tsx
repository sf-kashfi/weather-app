import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={4}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

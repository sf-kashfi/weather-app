import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardProps,
  CardContentProps,
  InputBase,
  InputBaseProps,
} from "@mui/material";
import background from "../assets/img/background.jpg";

export const StyledCard = styled(Card)<CardProps>(() => ({
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  borderRadius: "20px",
  boxShadow: "25px 25px 40px 0px rgba(0,0,0,0.33)",
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  maxWidth: "40%",
}));

export const StyledCardContent = styled(CardContent)<CardContentProps>(() => ({
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    left: "10px",
    right: "10px",
    bottom: "0",
    borderBottom: "1px solid #fff",
  },
  pb: 2,
}));

export const BootstrapInput = styled(InputBase)<InputBaseProps>(
  ({ theme }) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    width: "100%",
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiSvgIcon-root": {
      right: "unset",
      left: "7px",
    },
    "& .MuiInputBase-input": {
      "line-height": "1.4em",
      borderRadius: "0.25rem",
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #c4c4c4",
      fontSize: 13,
      padding: "7.1px",
      "text-align": "right",
      "&:focus": {
        borderRadius: "0.25rem",
        boxShadow: "inset 0px 0 0 1px #1976d2",
        borderColor: "#1976d2",
      },
    },
    "& .Mui-disabled": {
      "-webkit-text-fill-color": "rgb(0 0 0 / 70%)",
    },
  })
);

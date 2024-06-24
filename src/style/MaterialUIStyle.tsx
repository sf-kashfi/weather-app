import { styled } from "@mui/material/styles";
import { Card, CardContent, CardProps, CardContentProps } from "@mui/material";
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

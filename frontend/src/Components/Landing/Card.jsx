import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

export default function Cardd({ info, title, Img }) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ padding: "3%", height: "100%" }}>
        <CardMedia
          sx={{ height: 350, maxWidth: "100%", maxHeight: "100%" }}
          image={Img}
          title={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight={600}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {info}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

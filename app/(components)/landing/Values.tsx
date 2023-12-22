import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "./CustomTypography";

import MosqueOutlinedIcon from "@mui/icons-material/MosqueOutlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const Values = () => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "primary.light" }}
    >
      <Container sx={{ my: 20, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src="https://mui.com/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />
        <Grid container spacing={5} textAlign="center" color="#2a2a2a">
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <MosqueOutlinedIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                Ethical Financial Solutions
              </Typography>
              <Typography variant="h5">
                Upholding Shariah-compliant principles, fostering trust and
                reliability in financial operations.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <AllInclusiveOutlinedIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                Financial Accessibility
              </Typography>
              <Typography variant="h5">
                Offering diverse financial products, enabling inclusive access
                to opportunities and investment avenues.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <SettingsSuggestOutlinedIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                Empowering Financial Insight
              </Typography>
              <Typography variant="h5">
                Providing personalized financial guidance and insights to
                empower informed decisions and growth.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Values;

"use client";

import Image from "next/image";
import Typography from "./CustomTypography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styled from "@mui/material/styles/styled";
import Link from "next/link";

const ProductHeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "80vh",
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

function ProductHeroLayout(props: any) {
  const { sxBackground, children } = props;

  return (
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="https://mui.com/static/themes/onepirate/productHeroWonder.png"
          alt="wonder"
          width={147}
          height={80}
        />
        {children}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
        <Image
          src="https://mui.com/static/themes/onepirate/productHeroArrowDown.png"
          width={12}
          height={16}
          alt="arrow down"
          style={{ position: "absolute", bottom: 32 }}
        />
      </Container>
    </ProductHeroLayoutRoot>
  );
}

const backgroundImage =
  "https://media.istockphoto.com/id/1199347571/photo/islamic-banking-financing-conceptual-with-rosary-and-coins-on-a-green-background.jpg?s=612x612&w=0&k=20&c=nY7dfzP2eiUmM5B8jtsh4cWXjq46VKg11Yotn2hwidA=";

const Hero = () => {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <Image
        style={{ display: "none" }}
        src={backgroundImage}
        width={1440}
        height={960}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Reshaping Finance, Honouring Beliefs.
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Uniting Prosperity, Compliantly and Responsibly.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={Link}
        href="/auth"
        sx={{ minWidth: 200 }}
      >
        Get Started
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
};

export default Hero;

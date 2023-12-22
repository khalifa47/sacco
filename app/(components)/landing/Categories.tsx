"use client";

import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "./CustomTypography";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://media.istockphoto.com/id/1314165902/vector/small-business-loan-online-isometric.jpg?s=612x612&w=0&k=20&c=AR8ANTxOA1cqCW_I7OlPTvcKKLpgQF4ViCwcJ1wnBfE=",
    title: "Interest-free Loans",
    width: "40%",
  },
  {
    url: "https://media.istockphoto.com/id/1372102011/vector/business-analyst-financial-data-analysis-advisor-analyzing-financial-report.jpg?s=612x612&w=0&k=20&c=LpfJhQ4yLFPh-yXebLXpPZFHhDhT3lGzjA2mkGioiLw=",
    title: "Shares",
    width: "20%",
  },
  {
    url: "https://media.istockphoto.com/id/1400264338/vector/agreement-and-exchange-of-ideas-currency-russian-ruble.jpg?s=612x612&w=0&k=20&c=1nWD-cc5ichENCLN8Ht-2WPzvuieVBLBJceFOmPeSfA=",
    title: "Intelligent Loan Approval",
    width: "40%",
  },
  {
    url: "https://media.istockphoto.com/id/1080386434/vector/social-security-benefits-form-for-pensioners-and-disabled-person-concept.jpg?s=612x612&w=0&k=20&c=bgaGeT023JqQoaO8nVbd5nPH57YNZhvfxsSI5awVvro=",
    title: "Welfare Contributions",
    width: "33%",
  },
  {
    url: "https://media.istockphoto.com/id/1155424959/vector/financial-billing-data-businessman.jpg?s=612x612&w=0&k=20&c=VrbNvEJXlV1p8VJcDyPTe_ACWL413-Cifb8p3dG83sQ=",
    title: "Transaction Tracking",
    width: "33%",
  },
  {
    url: "https://media.istockphoto.com/id/1362847684/vector/money-question-where-to-invest-pay-off-debt-or-invest-to-earn-profit-financial-choice-or.jpg?s=612x612&w=0&k=20&c=o4gQZWGTqbJEqJA6pPMs8fKQVr27jGEk_z7Z65R-sVw=",
    title: "Investment Recommendations",
    width: "34%",
  },
];

const Categories = () => {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Services and Products
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
};

export default Categories;

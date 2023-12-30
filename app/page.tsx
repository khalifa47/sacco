import Categories from "./(components)/landing/Categories";
import LandingHeader from "./(components)/landing/Header";
import LandingFooter from "./(components)/landing/Footer";
import Hero from "./(components)/landing/Hero";
import Questions from "./(components)/landing/Questions";
import Values from "./(components)/landing/Values";

export default function Home() {
  return (
    <main>
      <LandingHeader />
      <Hero />
      <Values />
      <Categories />
      <Questions />
      <LandingFooter />
    </main>
  );
}

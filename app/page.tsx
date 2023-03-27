import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return <main className={roboto.className}>Hello World</main>;
}

import CustomCursor from "../components/CustomCursor";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Work_Sans } from "next/font/google";

const work_sans = Work_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={work_sans.className}>
      <CustomCursor>
        <Component {...pageProps} />
      </CustomCursor>
    </div>
  );
}

import type { AppProps } from "next/app";
import GlobalStyle from "../styles/globals"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { wrapper } from "@/store";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    )

};

export default wrapper.withRedux(App);
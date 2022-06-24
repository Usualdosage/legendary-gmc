import Head from "next/head";
import SSRProvider from "react-bootstrap/SSRProvider";
import NavBar from "../components/navbar";
import Footer from "./footer";
import styles from "../components/appbody.module.css"

export default function AppBody({ children }) {
    return (
        <>
            <SSRProvider>
                <Head>
                    <title>The Game Master's Companion</title>
                    <meta name="description" content="Legendary MUD Area Builder" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="bg-dark d-flex flex-column min-vh-100">
                    <NavBar />

                    <div className="bg-dark px-4 py-1 my-1 text-center flex-grow-1">
                        {children}
                    </div>
                    <Footer />
                </main>

            </SSRProvider>
        </>
    );
}

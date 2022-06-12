import Head from "next/head";
import SSRProvider from "react-bootstrap/SSRProvider";
import styles from "../components/headless.module.css"

export default function Headless({ children }) {
    return (
        <>
            <SSRProvider>
                <Head>
                    <title>The Game Master's Companion</title>
                    <meta name="description" content="Some description" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="bg-dark d-flex flex-column min-vh-100 loginBanner">
                </main>
                <div className={styles.centerOnPage}>
                    {children}
                </div>
                
            </SSRProvider>
        </>
    );
}

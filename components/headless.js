import Head from "next/head";
import SSRProvider from "react-bootstrap/SSRProvider";

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
                <div className="px-4 py-5 my-5 text-center flex-grow-1 centerOnPage">
                        {children}
                    </div>
            </SSRProvider>
        </>
    );
}

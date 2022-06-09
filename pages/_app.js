import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/mdb.min.css";
import "../styles/global.scss";
import React, { useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    import("bootstrap/dist/js/mdb.min");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

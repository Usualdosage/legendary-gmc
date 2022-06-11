import "bootstrap/dist/css/bootstrap.css";
import "mdb-ui-kit/css/mdb.min.css";
import "../styles/global.scss";
import React, { useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    import("mdb-ui-kit/js/mdb.min");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

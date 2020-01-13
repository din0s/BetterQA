import PropTypes, { InferProps } from "prop-types";

import Head from "next/head";
import Navbar from "../navbar/Navbar";

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node || PropTypes.arrayOf(PropTypes.node)
};

Layout.defaultProps = {
  title: "e-Study Guide"
};

function Layout({ title, children }: InferProps<typeof Layout.propTypes>) {
  return (
    <div className="App">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" key="charset" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
        />
      </Head>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;

import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    console.log("rendering document");
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;


"nextui-c-dIWzTP nextui-c-PJLV nextui-c-dIWzTP-hfnKRU-color-default nextui-c-dIWzTP-isWIbj-animated-true nextui-c-PJLV-gulvcB-isFocusVisible-false nextui-c-dIWzTP-ibzThln-css nextui-link nextui-navbar-link"
"nextui-c-dIWzTP nextui-c-PJLV nextui-c-dIWzTP-hfnKRU-color-default nextui-c-dIWzTP-isWIbj-animated-true nextui-c-PJLV-gulvcB-isFocusVisible-false nextui-c-dIWzTP-ihuOuWz-css nextui-link nextui-navbar-link"
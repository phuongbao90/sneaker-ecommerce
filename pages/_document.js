import Document, { Html, Head, Main, NextScript } from "next/document";
import { parseCookies } from "nookies";

class MyDocument extends Document {
  render() {
    return (
      <>
        <Html lang="en">
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600&family=Roboto&display=swap"
              // rel="preload"
              // rel="preconnect"
              rel="stylesheet"
              // as="style"
              // media="print"
              // onLoad="this.onload=null;this.rel='stylesheet';this.media='all'"
            />
          </Head>
          <body style={{ paddingTop: "64px" }}>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  const cookie = parseCookies(ctx);
  return { ...initialProps, cookie };
};

export default MyDocument;

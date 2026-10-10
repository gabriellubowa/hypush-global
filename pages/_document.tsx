import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
import { COLOR_MODE_SCRIPT } from "../theme/colorModeScript.js";
import { ServerStyleSheet } from "styled-components";

export default class HyPushDocument extends Document {
  // Collect styled-components CSS during the server render so the first
  // paint is already styled.
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps, styles: [initialProps.styles, sheet.getStyleElement()] };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* Allowed by its hash in next.config.ts. */}
          <script dangerouslySetInnerHTML={{ __html: COLOR_MODE_SCRIPT }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

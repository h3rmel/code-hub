import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Admin template webapp created with NextJS"
        />
        <meta name="keywords" content="Admin template, NextJS, Tailwind CSS, TypeScript" />
        <meta name="author" content="Isaac Hermel" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

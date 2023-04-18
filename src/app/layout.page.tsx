"use client";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <link rel="shortcut icon" href="/assets/favicon.ico?v=2" />
        <link rel="manifest" href="/assets/site.webmanifest?v=2" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png?v=2"
        />
        <link rel="mask-icon" href="/assets/safari-pinned-tab.svg?v=2" />
        <meta name="msapplication-TileColor" />
        <meta
          name="msapplication-config"
          content="/assets/browserconfig.xml?v=2"
        />
        <meta name="theme-color" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export const metadata = {
  title: "Test",
  description: "A very cool description of the website",
};

export default RootLayout;

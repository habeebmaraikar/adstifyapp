import Header from './components/header'; 
import Head from 'next/head';
import "./styles/globals.css";

export const metadata = {
  title: "Adstify App",
  description: "Display news from newyork times",
  icons: {
    icon: '/favicon.jpeg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Add Google Fonts link */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Lato:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>


      <body className="body">

        <Header pathname={children.props.pathname} />

        <main>{children}</main>

        <footer>
          <p>© 2024 Adstify. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

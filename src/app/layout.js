import Header from './components/header'; 
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

import { useRouter } from "next/router";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Container from 'react-bootstrap/Container';
import NavbarTop from "./components/NavBar";
import FooterBar from './components/FooterBar';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {!isLoginPage && <NavbarTop />}
      <main className="flex-grow-1">
        <title>Expense Tracker</title>
        <Container fluid>
          <Component {...pageProps} />
        </Container>
      </main>
      {!isLoginPage && <FooterBar />} 
    </div>
  );
}

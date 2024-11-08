import { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return <Dashboard/>;
}

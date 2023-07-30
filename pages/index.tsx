import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  // Redirect to login page
  useEffect(() => {
    router.push("/login");
  }, []);

  return null;
}

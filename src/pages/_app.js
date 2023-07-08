import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }) {
  const pathname = usePathname();
  const path = pathname.split("/");
  console.log(path[path.length - 1]);
  function hiddenSidebar(path) {
    if (path == "login") {
      return "hidden";
    }
  }
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

import HorizontalBarChart from "./components/horizontalbarchart";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  console.log(cookies);
  return {
    props: {},
  };
}

export default function Page() {
  return <div>Halaman admin</div>;
}

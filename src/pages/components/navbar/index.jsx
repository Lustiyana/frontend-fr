import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import nookies from "nookies";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = nookies.get();
        const token = cookies.token;
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL}/api/users/me`
          );
          console.log(response.data.username);
          setName(response.data.username);
        } else {
          Router.replace("/login");
        }
      } catch (error) {
        console.log("An error occurred:", error.response);
        Router.replace("/login");
      }
    };
    fetchData();
  }, []);

  function logout() {
    nookies.destroy(null, "token");
    Router.replace("/login");
  }

  return (
    <div className="w-full bg-white shadow-lg py-4 px-16">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-primary">Halo, {name}</div>
        <div className="flex items-center gap-4">
          <Image
            src="/assets/log-out.svg"
            width={500}
            height={500}
            alt="log out"
            className="w-9"
          />
          <button className="text-lg font-semibold" onClick={logout}>
            Log-out
          </button>
        </div>
      </div>
    </div>
  );
}

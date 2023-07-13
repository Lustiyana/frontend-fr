import Loader from "@/components/loader";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import nookies from "nookies";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

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
          setName(response.data.username);
        } else {
          Router.replace("/login");
        }
      } catch (error) {
        Router.replace("/login");
      }
    };
    fetchData();
  }, []);

  function logout() {
    setLoading(true);
    nookies.destroy(null, "token");
    Router.replace("/login");
  }

  return (
    <div className="w-full bg-white shadow-lg py-4 sm:px-16 max-sm:px-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="btn btn-ghost m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <div className="text-lg font-semibold text-primary">
                  Halo, {name}
                </div>
              </li>
              <li>
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
              </li>
            </ul>
          </div>
          <div className="flex justify-between items-center max-sm:hidden">
            <div className="text-lg font-semibold text-primary">
              Halo, {name}
            </div>
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
        </>
      )}
    </div>
  );
}

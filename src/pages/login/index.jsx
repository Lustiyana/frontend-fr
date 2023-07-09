import axios from "axios";
import { useState } from "react";
import nookies, { parseCookies, setCookie } from "nookies";
import Router from "next/router";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (cookies.token) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  console.log(cookies);
  return {
    props: {},
  };
}

export default function Page() {
  const [modifiedData, setModifiedData] = useState({
    identifier: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function dataValidation() {
    if (modifiedData.identifier === "") {
      setErrorMessage("Email tidak boleh kosong");
      return;
    }
    if (modifiedData.password === "") {
      setErrorMessage("Password tidak boleh kosong");
      return;
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    setModifiedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rememberMeCheckbox = document.getElementById("rememberMeCheckbox");
    const rememberMe = rememberMeCheckbox.checked;

    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/auth/local`, {
        identifier: modifiedData.identifier,
        password: modifiedData.password,
      })
      .then((response) => {
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        localStorage.setItem("id", response.data.user.id);
        if (response.data.jwt) {
          if (rememberMe) {
            const expiration = new Date();
            expiration.setDate(expiration.getDate() + 30);
            setCookie(null, "token", response.data.jwt, {
              expires: expiration,
              path: "/",
            });
          } else {
            setCookie(null, "token", response.data.jwt);
          }
          Router.replace("/");
        }
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        setErrorMessage(error.response.data.error.message);
        dataValidation();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="h-screen flex">
      <div className="grid grid-cols-2 gap-4 items-center p-12">
        <div>
          <img src="/assets/login.svg" alt="" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="font-bold">
              <div>SILAHKAN MASUK</div>
            </div>
          </div>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Email"
              name="identifier"
              value={modifiedData.identifier}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={modifiedData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <div className="form-control">
              <label className="cursor-pointer flex gap-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="rememberMeCheckbox"
                />
                <span className="label-text">Remember me</span>
              </label>
            </div>
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Loading..." : "MASUK"}
            </button>
            <div className="text-center">
              Belum punya akun?{" "}
              <Link href="/registrasi" className="text-primary">
                Daftar Sekarang
              </Link>
            </div>
          </form>
          {errorMessage && (
            <div className="toast toast-bottom toast-end">
              <div className="alert alert-error">
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

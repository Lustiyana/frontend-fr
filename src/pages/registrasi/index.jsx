import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import nookies, { parseCookies, setCookie } from "nookies";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (cookies.token) {
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

export default function Registrasi() {
  const [modifiedData, setModifiedData] = useState({
    username: "",
    email: "",
    name: "",
    nim: "",
    angkatan: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setModifiedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modifiedData.password !== modifiedData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/auth/local/register`, {
        email: modifiedData.email,
        username: modifiedData.username,
        name: modifiedData.name,
        nim: modifiedData.nim,
        angkatan: modifiedData.angkatan,
        password: modifiedData.password,
      })
      .then((response) => {
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        Router.replace("/login");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  const closeModal = () => {
    setError(null); // Clear the error message
  };

  return (
    <div className="m-auto h-screen flex items-center justify-center">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold">
            <div>SILAHKAN MENDAFTAR</div>
          </div>
        </div>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={modifiedData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={modifiedData.username}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={modifiedData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="NIM"
            name="nim"
            value={modifiedData.nim}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <select
            className="select select-bordered w-full"
            name="angkatan"
            value={modifiedData.angkatan}
            onChange={handleChange}
          >
            <option selected>Angkatan</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
          <div className="flex gap-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={modifiedData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={modifiedData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            DAFTAR
          </button>
          <div className="text-center">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary">
              Masuk Sekarang
            </Link>
          </div>
        </form>
        {error && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-75">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Error</h2>
              <p>{error}</p>
              <div className="flex justify-end mt-4">
                <button className="btn btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import nookies, { parseCookies, setCookie } from "nookies";

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
    image: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setModifiedData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(modifiedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:1337/api/auth/local/register", {
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
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className="w-1/2 m-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold">
            <div>SILAHKAN MASUK</div>
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
            value={modifiedData.angkatan}
            onChange={handleChange}
          >
            <option disabled selected>
              Angkatan
            </option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
          {/* {emailError && <span className="text-red-500">{emailError}</span>} */}
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
            placeholder="Konfirmasi Password"
            name="password"
            className="input input-bordered w-full"
          />
          {/* {passwordError && (
            <span className="text-red-500">{passwordError}</span>
          )} */}

          <button className="btn btn-primary">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

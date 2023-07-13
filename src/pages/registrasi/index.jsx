import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import nookies, { parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorValidation from "@/components/error";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (cookies.token) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}

export default function Registrasi() {
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      name: "",
      nim: "",
      phone: "",
      angkatan: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      username: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      nim: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      angkatan: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/auth/local/register`, {
        email: values.email,
        username: values.username,
        name: values.name,
        nim: values.nim,
        phone: values.phone,
        angkatan: values.angkatan,
        password: values.password,
      })
      .then((response) => {
        Router.replace("/login");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error.message);
      });
  };

  return (
    <div className="m-auto h-screen flex items-center justify-center max-sm:p-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold">
            <div>SIGN UP</div>
          </div>
        </div>
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          {formik.touched.email && formik.errors.email ? (
            <ErrorValidation message={formik.errors.email} />
          ) : null}
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          {formik.touched.username && formik.errors.username ? (
            <ErrorValidation message={formik.errors.username} />
          ) : null}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          {formik.touched.name && formik.errors.name ? (
            <ErrorValidation message={formik.errors.name} />
          ) : null}
          <input
            type="text"
            placeholder="NIM"
            name="nim"
            value={formik.values.nim}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          {formik.touched.nim && formik.errors.nim ? (
            <ErrorValidation message={formik.errors.nim} />
          ) : null}
          <input
            type="number"
            placeholder="No. Whatsapp"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <ErrorValidation message={formik.errors.phone} />
          ) : null}
          <select
            className="select select-bordered w-full"
            name="angkatan"
            value={formik.values.angkatan}
            onChange={formik.handleChange}
          >
            <option selected>Angkatan</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
          {formik.touched.angkatan && formik.errors.angkatan ? (
            <ErrorValidation message={formik.errors.angkatan} />
          ) : null}
          <div className="flex sm:gap-4 gap-1">
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="input input-bordered w-full block"
              />
              {formik.touched.password && formik.errors.password ? (
                <ErrorValidation message={formik.errors.password} />
              ) : null}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                className="input input-bordered w-full"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <ErrorValidation message={formik.errors.confirmPassword} />
              ) : null}
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            REGISTER
          </button>
          <div className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login now
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
  );
}

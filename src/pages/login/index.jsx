import axios from "axios";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import nookies, { parseCookies, setCookie } from "nookies";
import Router from "next/router";
import Link from "next/link";
import ErrorValidation from "@/components/error";
import * as Yup from "yup";
import Image from "next/image";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (cookies.token) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}

export default function Page() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    const rememberMeCheckbox = document.getElementById("rememberMeCheckbox");
    const rememberMe = rememberMeCheckbox.checked;

    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/auth/local`, {
        identifier: values.identifier,
        password: values.password,
      })
      .then((response) => {
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
        setErrorMessage(error.response.data.error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="h-screen flex">
      <div className="grid sm:grid-cols-2 gap-4 items-center p-12">
        <div className="max-sm:hidden">
          <Image
            src="/assets/login.svg"
            width={500}
            height={500}
            alt=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="font-bold">
              <div>LOGIN</div>
            </div>
          </div>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="text"
              placeholder="Email"
              name="identifier"
              value={formik.values.identifier}
              onChange={formik.handleChange}
              className="input input-bordered w-full"
            />
            {formik.touched.identifier && formik.errors.identifier ? (
              <ErrorValidation message={formik.errors.identifier} />
            ) : null}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="input input-bordered w-full"
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorValidation message={formik.errors.password} />
            ) : null}
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
              {loading ? "Loading..." : "LOGIN"}
            </button>
            <div className="text-center">
              Don't have an account?{" "}
              <Link href="/registrasi" className="text-primary">
                Sign Up now
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

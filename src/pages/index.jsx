import Head from "next/head";
import Camera from "./components/camera";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Face Recognition</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Navbar />
        <Camera />
      </main>
    </>
  );
}

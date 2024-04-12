import Nav from "~/components/Nav";
export default function About() {
  return (
    <>
      <Nav />
      <main className="text-center mx-auto text-gray-700 p-4">
      <h1 className="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        About Page
      </h1>
      <p className="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          className="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p className="my-4">
        <A href="/" className="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <span>About Page</span>
      </p>
    </main>
    </>

  );
}

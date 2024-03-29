import NavBar from "@/components/NavBar";
import Link from "next/link";
import { IPageProps } from "./_app";

export default function Login(props: IPageProps) {
  return (
    <>
      <NavBar />
      <section className="hero is-primary is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title my-6">Welcome to Party Push!</p>
            <p className="subtitle">
              <Link className="button is-warning is-large mx-3" href="/login">
                <strong>Login</strong>
              </Link>
              <Link
                className="button is-warning is-large mx-3"
                href="/create-account"
              >
                <strong>Sign Up</strong>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

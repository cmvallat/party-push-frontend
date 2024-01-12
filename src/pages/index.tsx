import NavBar from "@/components/NavBar";
import Link from "next/link";
import { FormEvent } from "react";
import { useState } from "react";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";
import { IPageProps } from "./_app";

export default function Login(props: IPageProps) {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setLoginInfo({
      ...loginInfo,
      [key]: value,
    });
  };

  const getUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `party-push-backend.us-east-1.elasticbeanstalk.com/Party/get-user?username=${loginInfo.username}&password=${loginInfo.password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const status = response.status;
        return response.json().then((res) => {
          if (status === 200) {
            props.setAuthenticationData({
              ...props.authenticationData,
              token: res.message,
            });
            Router.push("/select-party");
          } else {
            handleErrors(res);
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

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

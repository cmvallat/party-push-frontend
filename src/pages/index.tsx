import NavBar from '@/components/NavBar'
import Link from 'next/link'
import { FormEvent } from 'react';
import { useState } from 'react';
import Router from 'next/router';
import { handleErrors } from '@/utils/utils';
import { IPageProps } from './_app';

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

  const getHost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `https://localhost:5001/Demo/get-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": loginInfo.username,
          "password": loginInfo.password,
        }),
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
      <section className="section">
        <form className="box" onSubmit={getHost}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Username"
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Login
          </button>
        </form>
        <form className="box">
          <div className="notification is-primary">
            Want to create an account? Create one{" "}
            <Link href="/create-account">here</Link>!
          </div>
        </form>
      </section>
    </>
  );
}

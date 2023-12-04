import NavBar from "@/components/NavBar";
import { useState } from "react";
import Link from "next/link";
import { FormEvent } from "react";
import { IPageProps } from "./_app";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";

export default function CreateAccount(props: IPageProps) {
  const [createAccountInfo, setCreateAccountInfo] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (key: string, value: string) => {
    setCreateAccountInfo({
      ...createAccountInfo,
      [key]: value,
    });
  };

  const createAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `https://livepartyhelper.com/Party/add-user?username=${createAccountInfo.username}&password=${createAccountInfo.password}&phone_number=${createAccountInfo.phoneNumber}`,
      {
        method: "GET",
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
      <section className="section">
        <form className="box" onSubmit={createAccount}>
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
          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Phone Number"
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
              <strong>
                By submitting, you authorize PartyPush to send text messages
                with updates throughout the party. Message/data rates apply.
              </strong>
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Create Account
          </button>
        </form>
        <form className="box">
          <div className="notification is-primary">
            Already have an account? Log in{" "}
            <Link href="/create-account">here</Link>!
          </div>
        </form>
      </section>
    </>
  );
}

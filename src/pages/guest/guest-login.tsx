import NavBar from "@/components/NavBar";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";
import { IPageProps } from "../_app";

export default function GuestLogin({ guestData, setGuestData}: IPageProps) {
  const [guestLogin, setGuestLogin] = useState({
    guestName: "",
    partyCode: "",
  });

  const handleChange = (key: string, value: string) => {
    setGuestLogin({
      ...guestLogin,
      [key]: value,
    });
  };

  const joinParty = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`https://localhost:5001/Demo/guest-check-in?party_code=${guestLogin.partyCode}&guest_name=${guestLogin.guestName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            setGuestData({
                ...guestData,
                partyCode: guestLogin.partyCode,
                guestName: guestLogin.guestName,
            })
            Router.push(`/guest/guest-info/`);
          } else {
            throw res;
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
        <form className="box" onSubmit={joinParty}>
          <div className="field">
            <label className="label">Guest Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Guest Name"
                onChange={(e) => handleChange("guestName", e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Party Code</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Party Code"
                onChange={(e) => handleChange("partyCode", e.target.value)}
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Join Party
          </button>
        </form>
        <form className="box">
          <div className="notification is-primary">
            Want to start a new party? Create one{" "}
            <Link href="/create-party">here</Link>!
          </div>
        </form>
      </section>
    </>
  );
}

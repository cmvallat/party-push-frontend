import NavBar from "@/components/NavBar";
import Router from "next/router";
import { IPageProps } from "./_app";
import { FormEvent, useState } from "react";

export default function PartyLogin({ hostData, setHostData }: IPageProps) {
  const [partyLoginInfo, setPartyLoginInfo] = useState({
    partyCode: 0,
    password: "",
    phoneNumber: "",
  });

  const handleChange = (key: string, value: string) => {
    setPartyLoginInfo({
      ...partyLoginInfo,
      [key]: value,
    });
  };

  const getHost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `https://localhost:5001/Demo/get-host-from-check-in?party_code=${partyLoginInfo.partyCode}&phone_number=${partyLoginInfo.phoneNumber}&password=${partyLoginInfo.password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).then((responseData) => {
        setHostData({
            ...hostData,
            inviteOnly: responseData.invite_only,
            partyCode: responseData.party_code,
        });
        Router.push(`/party-management`)
    })
    .catch((error) => console.log("Error:" + error));
  };

  return (
    <>
      <NavBar />
      <section className="section">
        <form className="box" onSubmit={getHost}>
          <div className="field">
            <label className="label">Party Code</label>
            <div className="control">
              <input
                id="partyCode"
                className="input"
                type="text"
                placeholder="Party Code"
                onChange={(e) => handleChange("partyCode", e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <input
                id="phoneNumber"
                className="input"
                type="text"
                placeholder="Phone Number"
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                id="password"
                className="input"
                type="text"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Go To Party
          </button>
        </form>
      </section>
    </>
  );
}

import NavBar from "@/components/NavBar";
import Router from "next/router";
import { IPageProps } from "./_app";
import { FormEvent, useState } from "react";

export default function PartyLogin({ data, setData }: IPageProps) {
  const [partyLoginInfo, setPartyLoginInfo] = useState({
    partyCode: 0,
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
      `https://localhost:5001/Demo/get-host?party_code=${partyLoginInfo.partyCode}`,
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
        setData({
            ...data,
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
          <button className="button is-primary" type="submit">
            Go To Party
          </button>
        </form>
      </section>
    </>
  );
}

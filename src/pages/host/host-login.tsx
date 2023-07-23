import NavBar from "@/components/NavBar";
import Router from "next/router";
import { IPageProps } from "../_app";
import { FormEvent, useState } from "react";
import { handleErrors } from "@/utils/utils";

export default function PartyLogin({ hostData, setHostData }: IPageProps) {
  const [partyLoginInfo, setPartyLoginInfo] = useState({
    partyCode: "",
    password: "",
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
        const status = response.status;
        return response.json().then((res) => {
          if (status === 200) {
            setHostData({
              ...hostData,
              partyCode: partyLoginInfo.partyCode,
            });
            Router.push("/host/host-info");
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
            <label className="label">Party Code</label>
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

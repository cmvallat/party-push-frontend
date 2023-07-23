import NavBar from "@/components/NavBar";
import Link from "next/link";
import Router from "next/router";
import { IPageProps } from "../_app";
import { FormEvent, useState } from "react";
import { handleErrors } from "@/utils/utils";

export default function CreateParty({ hostData, setHostData }: IPageProps) {
  const [partyInfo, setPartyInfo] = useState({
    partyName: "",
    partyCode: "",
    phoneNumber: "",
    spotifyDeviceId: "",
    password: "",
    inviteOnly: false,
  });

  const handleChange = (key: string, value: string) => {
    setPartyInfo({
      ...partyInfo,
      [key]: value,
    });
  };

  const createParty = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inviteOnly = partyInfo.inviteOnly ? 1 : 0;
    fetch(
      `https://localhost:5001/Demo/create-party?Party_name=${partyInfo.partyName}&Party_code=${partyInfo.partyCode}&Phone_number=${partyInfo.phoneNumber}&Spotify_device_id=${partyInfo.spotifyDeviceId}&Invite_only=${inviteOnly}&Password=${partyInfo.password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((res) => {
            setHostData({
              ...hostData,
              inviteOnly: inviteOnly,
              partyCode: partyInfo.partyCode,
            });
            Router.push("/host/host-info");
          });
        } else {
          throw response.json().then((error) => {
            handleErrors(error);
          });
        }
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  return (
    <>
      <NavBar />
      <section className="section">
        <form className="box" onSubmit={createParty}>
          <div className="field">
            <label className="label">Party Name</label>
            <div className="control">
              <input
                id="guestName"
                className="input"
                type="text"
                placeholder="Party Name"
                onChange={(e) => handleChange("partyName", e.target.value)}
              />
            </div>
          </div>
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
            <label className="label">Spotify Device Id</label>
            <div className="control">
              <input
                id="spotifyDeviceId"
                className="input"
                type="text"
                placeholder="Spotify Device Id"
                onChange={(e) =>
                  handleChange("spotifyDeviceId", e.target.value)
                }
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
          <div className="field">
            <label className="label">Invite Only</label>
            <div className="control">
              <input
                id="inviteOnly"
                className="checkbox"
                type="checkbox"
                onChange={(e) => handleChange("inviteOnly", e.target.value)}
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Create Party
          </button>
        </form>
        <form className="box">
          <div className="notification is-primary">
            Want to log in to an existing party? Click{" "}
            <Link href="/party-login">here</Link>!
          </div>
        </form>
      </section>
    </>
  );
}

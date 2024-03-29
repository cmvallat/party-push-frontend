import NavBar from "@/components/NavBar";
import Link from "next/link";
import Router from "next/router";
import { IPageProps } from "../_app";
import { FormEvent, useState } from "react";
import { handleErrors } from "@/utils/utils";
import { headers } from "@/utils/utils";

export default function CreateParty(props: IPageProps) {
  const [partyInfo, setPartyInfo] = useState({
    partyName: "",
    partyCode: "",
    phoneNumber: "",
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
      `http://party-push-backend.us-east-1.elasticbeanstalk.com/Party/add-host?Party_name=${partyInfo.partyName}&Party_code=${partyInfo.partyCode}&Phone_number=${partyInfo.phoneNumber}&Invite_only=${inviteOnly}`,
      {
        method: "POST",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            props.setHostData({
              ...props.hostData,
              inviteOnly: inviteOnly,
              partyCode: partyInfo.partyCode,
            });
            Router.push("/host/host-info");
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
            Join Party
          </button>
        </form>
        <form className="box">
          <div className="notification is-primary">
            Want to join an existing party? Click{" "}
            <Link href="/host/host-login">here</Link>!
          </div>
        </form>
      </section>
    </>
  );
}

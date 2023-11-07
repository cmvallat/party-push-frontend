import NavBar from "@/components/NavBar";
import { useState } from "react";
import Link from "next/link";

export default function CreateAccount() {
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

  return (
    <>
      <NavBar />
      <section className="section">
        <form className="box">
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
            Want to create an account? Create one{" "}
            <Link href="/create-account">here</Link>!
          </div>
        </form>
      </section>
    </>
  );
}
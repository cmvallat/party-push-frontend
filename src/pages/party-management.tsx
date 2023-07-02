import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "./_app";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import Router from "next/router";

export default function PartyManagement({ data }: IPageProps) {
  const [managementInfo, setManagementInfo] = useState({
    guestName: "",
    guestList: [{ guest_name: "", party_code: "", at_party: 0 }],
  });

  const handleChange = (key: string, value: string) => {
    setManagementInfo({
      ...managementInfo,
      [key]: value,
    });
  };

  useEffect(() => {
    if (data.partyCode === "") {
      Router.push(`/party-login`);
    }
    fetch(`https://localhost:5001/Demo/get-current-guest-list?party_code=145`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setManagementInfo({
          ...managementInfo,
          guestList: data,
        });
      })
      .catch((error) => console.log("Error:" + error));
  }, []);

  const addGuestFromHost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      invite_only: data.inviteOnly,
      guest_name: managementInfo.guestName,
      party_code: data.partyCode,
    };
    fetch(
      `https://localhost:5001/Demo/add-guest-from-host?host_invite_only=${data.inviteOnly}&guest_name=${managementInfo.guestName}&party_code=${data.partyCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        toast("Invite Sent", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
      })
      .catch((error) => {
        console.log("Error:" + error);
        toast("Failed: Retry", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      });
  };

  const deleteGuest = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const body = {
      at_party: 0,
      guest_name: event.currentTarget.id,
      party_code: data.partyCode,
    };
    fetch(`https://localhost:5001/Demo/delete-guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        toast("Guest Deleted", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
      })
      .catch((error) => {
        console.log("Error:" + error);
        toast("Failed: Retry", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      });
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-half">
            <div className="notification is-primary">
              Guests at Party:
              <ol>
                {managementInfo.guestList.map((guest) => (
                  <li>
                    {guest.guest_name}
                    <button className="delete" id={guest.guest_name} onClick={deleteGuest}></button>
                  </li>
                ))}
              </ol>
            </div>
            <br />
            <div className="notification is-primary">
              <form className="box" onSubmit={addGuestFromHost}>
                <div className="field">
                  <label className="label">Guest Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Guest Name"
                      onChange={(e) =>
                        handleChange("guestName", e.target.value)
                      }
                    />
                  </div>
                </div>
                <button className="button is-primary" type="submit">
                  Add Guest
                </button>
              </form>
            </div>
          </div>
          <div className="column is-half">
            <div className="notification is-primary">
              Food and Drink information will go here.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

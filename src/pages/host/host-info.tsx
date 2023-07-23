import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "../_app";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";

export default function PartyManagement({ hostData }: IPageProps) {
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
    if (hostData.partyCode === "") {
      Router.push(`/host-login`);
    } else {
      fetch(
        `https://localhost:5001/Demo/get-current-guest-list?party_code=${hostData.partyCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json().then((res) => {
            if (response.status === 200) {
              setManagementInfo({
                ...managementInfo,
                guestList: res.guestList,
              });
            } else {
              throw res;
            }
          });
        })
        .catch((error) => {
          handleErrors(error);
        });
    }
  }, []);

  const addGuestFromHost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `https://localhost:5001/Demo/add-guest-from-host?host_invite_only=${hostData.inviteOnly}&guest_name=${managementInfo.guestName}&party_code=${hostData.partyCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            toast("Invite Sent", {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
          } else {
            throw res;
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  const deleteGuest = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const guestName = event.currentTarget.id;
    fetch(
      `https://localhost:5001/Demo/delete-guest?guest_name=${guestName}&party_code=${hostData.partyCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            toast("Guest Deleted", {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
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
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-half">
            <div className="notification is-primary">
              Guests at Party:
              <ol>
                {managementInfo.guestList.map((guest) => (
                  <li>
                    {guest.guest_name}
                    <button
                      className="delete"
                      id={guest.guest_name}
                      onClick={deleteGuest}
                    ></button>
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

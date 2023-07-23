import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "../_app";
import { toast } from "react-toastify";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";

export default function GuestInfo({ guestData }: IPageProps) {
  const [guestInfo, setGuestInfo] = useState({
    partyName: "",
  });

  const handleChange = (key: string, value: string) => {
    setGuestInfo({
      ...guestInfo,
      [key]: value,
    });
  };

  useEffect(() => {
    if (guestData.partyCode === "") {
      Router.push(`/guest-login`);
    } else {
      fetch(
        `https://localhost:5001/Demo/get-host?party_code=${guestData.partyCode}`,
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
              setGuestInfo({
                ...guestInfo,
                partyName: res.message["party_name"],
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

  const leaveParty = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const guestName = event.currentTarget.id;
    fetch(
      `https://localhost:5001/Demo/leave-party?party_code=${guestData.partyCode}&guest_name=${guestName}`,
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
      })
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-half">
            <div className="notification is-primary">
              Welcome to {guestInfo.partyName}, {guestData.guestName}!
            </div>
            <br />
            <div className="notification is-primary">
              <form className="box">
                <button className="button is-primary" onClick={leaveParty}>
                  Leave Party
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
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "../_app";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";

export default function GuestInfo({ guestData }: IPageProps) {
  const [guestInfo, setGuestInfo] = useState({
    foodList: [{ item_name: "", party_code: "", status: "" }],
    partyName: "",
  });

  useEffect(() => {
      getHost();
      getCurrentFoodList();
  }, []);

  const getHost = () => {
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
            setGuestInfo((prevState) => ({
              ...prevState,
              partyName: res.message["party_name"],
            }));
          } else {
            handleErrors(res);
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  }

  const getCurrentFoodList = () => {
    fetch(
      `https://localhost:5001/Demo/get-current-food-list?party_code=${guestData.partyCode}`,
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
            setGuestInfo((prevState) => ({
              ...prevState,
              foodList: res.message,
            }));
          } else {
            handleErrors(res);
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  const changeFoodStatusFromGuest = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const itemName = event.currentTarget.id;
    const status = event.currentTarget.value;
    fetch(
      `https://localhost:5001/Demo/change-food-status-from-guest?party_code=${guestData.partyCode}&status=${status}&guest_name=${guestData.guestName}&item_name=${itemName}`,
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
            const updatedFoodList = guestInfo.foodList
            updatedFoodList.forEach((item) => {
              if (item.item_name === itemName) {
                item.status = status
              }
            })
            setGuestInfo((prevState) => ({
              ...prevState,
              foodList: updatedFoodList,
            }))
            toast("Item Status Changed", {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
          } else {
            handleErrors(res);
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

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
            handleErrors(res);
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
              Food:
              <ol>
                {guestInfo.foodList.map((item) => (
                  <li>
                    {item.item_name}
                    <div className="select is-primary">
                      <select id={item.item_name} onChange={changeFoodStatusFromGuest} value={item.status}>
                        <option>full</option>
                        <option>low</option>
                        <option>out</option>
                      </select>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
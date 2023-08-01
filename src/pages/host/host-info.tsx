import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "../_app";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";

export default function PartyManagement({ hostData }: IPageProps) {
  const [managementInfo, setManagementInfo] = useState({
    foodList: [{ item_name: "", party_code: "", status: "" }],
    guestName: "",
    guestList: [{ guest_name: "", party_code: "", at_party: 0 }],
    itemName: "",
  });

  const handleChange = (key: string, value: string) => {
    setManagementInfo({
      ...managementInfo,
      [key]: value,
    });
  };

  useEffect(() => {
    if (hostData.partyCode === "") {
      Router.push(`/host/host-login`);
    } else {
      getGuestList();
      getCurrentFoodList();
    }
  }, []);

  const getInfo = async () => {
    await getGuestList();
  };

  const getCurrentFoodList = () => {
    fetch(
      `https://localhost:5001/Demo/get-current-food-list?party_code=${hostData.partyCode}`,
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
            setManagementInfo((prevState) => ({
              ...prevState,
              foodList: res.message,
            }));
          } else {
            throw res;
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  const getGuestList = () => {
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
            setManagementInfo((prevState) => ({
              ...prevState,
              guestList: res.guestList,
            }));
          } else {
            throw res;
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

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

  const deleteGuest = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const addFoodItemFromHost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `https://localhost:5001/Demo/add-food-item-from-host?party_code=${hostData.partyCode}&item_name=${managementInfo.itemName}`,
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
            setManagementInfo((prevState) => ({
              ...prevState,
              foodList: res.message,
            }));
            toast("Item Added", {
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

  const changeFoodStatusFromHost = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const itemName = event.currentTarget.id;
    const status = event.currentTarget.value;
    fetch(
      `https://localhost:5001/Demo/change-food-status-from-host?party_code=${hostData.partyCode}&status=${status}&item_name=${itemName}`,
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
            const updatedFoodList = managementInfo.foodList
            updatedFoodList.forEach((item) => {
              if (item.item_name === itemName) {
                item.status = status
              }
            })
            setManagementInfo({
              ...managementInfo,
              foodList: updatedFoodList,
            })
            toast("Item Status Changed", {
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

  const removeFoodItemFromHost = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const itemName = event.currentTarget.id;
    fetch(
      `https://localhost:5001/Demo/remove-food-item-from-host?party_code=${hostData.partyCode}&item_name=${itemName}`,
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
            setManagementInfo((prevState) => ({
              ...prevState,
              foodList: res.message,
            }));
            toast("Item Deleted", {
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
              Food:
              <ol>
                {managementInfo.foodList.map((guest) => (
                  <li>
                    {guest.item_name}
                    <div className="select is-primary">
                      <select id={guest.item_name} onChange={changeFoodStatusFromHost} value={guest.status}>
                        <option>full</option>
                        <option>low</option>
                        <option>out</option>
                      </select>
                    </div>
                    <button
                      className="delete"
                      id={guest.item_name}
                      onClick={removeFoodItemFromHost}
                    ></button>
                  </li>
                ))}
              </ol>
            </div>
            <br />
            <div className="notification is-primary">
              <form className="box" onSubmit={addFoodItemFromHost}>
                <div className="field">
                  <label className="label">Item Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Item Name"
                      onChange={(e) => handleChange("itemName", e.target.value)}
                    />
                  </div>
                </div>
                <button className="button is-primary" type="submit">
                  Add Item
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

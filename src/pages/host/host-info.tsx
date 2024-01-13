import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "../_app";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";
import { headers } from "@/utils/utils";

export default function HostInfo(props: IPageProps) {
  interface Food {
    itemName: string;
    partyCode: string;
    status: string;
  }

  interface Guest {
    guestName: string;
    partyCode: string;
    atParty: number;
  }

  interface HostInfoI {
    foodList: Food[];
    guestUsername: string;
    guestList: Guest[];
    itemName: string;
  }

  const [hostInfo, setHostInfo] = useState<HostInfoI>({
    foodList: [],
    guestUsername: "",
    guestList: [],
    itemName: "",
  });

  const handleChange = (key: string, value: string) => {
    setHostInfo({
      ...hostInfo,
      [key]: value,
    });
  };

  useEffect(() => {
    if (props.hostData.partyCode === "") {
      Router.push(`/`);
    } else {
      getPartyInfo();
    }
  }, []);

  const getPartyInfo = () => {
    fetch(
      `http://party-push-backend.us-east-1.elasticbeanstalk.com/Party/get-party-info?party_code=${props.hostData.partyCode}`,
      {
        method: "GET",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            const guestList: Guest[] = res.message[0]?.map((guest: any) => {
              return {
                guestName: guest.guest_name,
                partyCode: guest.party_code,
                atParty: guest.at_party,
              };
            });
            const foodList: Food[] = res.message[1]?.map((food: any) => {
              return {
                itemName: food.item_name,
                partyCode: food.party_code,
                status: food.status,
              };
            });
            setHostInfo((prevState) => ({
              ...prevState,
              guestList: guestList ? guestList : [],
              foodList: foodList ? foodList : [],
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

  const addGuestFromHost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `http://party-push-backend.us-east-1.elasticbeanstalk.com/Party/add-guest-from-host?host_invite_only=${props.hostData.inviteOnly}&guest_name=${hostInfo.guestUsername}&party_code=${props.hostData.partyCode}&guest_username=${hostInfo.guestUsername}`,
      {
        method: "POST",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            // setManagementInfo((prevState) => ({
            //   ...prevState,
            //   guestList: res.message,
            // }));
            toast("Invite Sent", {
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

  const deleteGuest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const guestName = event.currentTarget.id;
    fetch(
      `http://party-push-backend.us-east-1.elasticbeanstalk.com/Party/delete-guest?guest_name=${guestName}&party_code=${props.hostData.partyCode}`,
      {
        method: "POST",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            setHostInfo((prevState) => ({
              ...prevState,
              guestList: res.message,
            }));
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
      });
  };

  const addFood = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `http://party-push-backend.us-east-1.elasticbeanstalk.com/Party/add-food?party_code=${props.hostData.partyCode}&item_name=${hostInfo.itemName}`,
      {
        method: "POST",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            const foodList: Food[] = res.message.map((food: any) => {
              return {
                itemName: food.item_name,
                partyCode: food.party_code,
                status: food.status,
              };
            });
            setHostInfo((prevState) => ({
              ...prevState,
              foodList,
            }));
            toast("Item Added", {
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

  const updateFoodStatusFromHost = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const itemName = event.currentTarget.id;
    const status = event.currentTarget.value;
    fetch(
      `http://party-push-backend.us-east-1.elasticbeanstalk.com/Party/update-food-status-from-host?party_code=${props.hostData.partyCode}&status=${status}&item_name=${itemName}`,
      {
        method: "POST",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            const updatedFoodList = hostInfo.foodList;
            updatedFoodList.forEach((item) => {
              if (item.itemName === itemName) {
                item.status = status;
              }
            });
            setHostInfo({
              ...hostInfo,
              foodList: updatedFoodList,
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

  const deleteFood = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const itemName = event.currentTarget.id;
    fetch(
      `http://party-push-backend.us-east-1.elasticbeanstalk.com/Party/delete-food?party_code=${props.hostData.partyCode}&item_name=${itemName}`,
      {
        method: "POST",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            const foodList: Food[] = res.message.map((food: any) => {
              return {
                itemName: food.item_name,
                partyCode: food.party_code,
                status: food.status,
              };
            });
            setHostInfo((prevState) => ({
              ...prevState,
              foodList,
            }));
            toast("Item Deleted", {
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

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-half">
            <div className="notification is-primary">
              Guests at Party:
              <ol>
                {hostInfo.guestList.map((guest) => {
                  if (guest.atParty === 1) {
                    return (
                      <li>
                        {guest.guestName}
                        <button
                          className="delete"
                          id={guest.guestName}
                          onClick={deleteGuest}
                        ></button>
                      </li>
                    );
                  }
                })}
              </ol>
              Guests invited:
              <ol>
                {hostInfo.guestList.map((guest) => {
                  if (guest.atParty === 0) {
                    return (
                      <li>
                        {guest.guestName}
                        <button
                          className="delete"
                          id={guest.guestName}
                          onClick={deleteGuest}
                        ></button>
                      </li>
                    );
                  }
                })}
              </ol>
            </div>
            <br />
            <div className="notification is-primary">
              <form className="box" onSubmit={addGuestFromHost}>
                <div className="field">
                  <label className="label">Guest Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Guest Username"
                      onChange={(e) =>
                        handleChange("guestUsername", e.target.value)
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
                {hostInfo.foodList.map((food) => (
                  <li>
                    {food.itemName}
                    <div className="select is-primary">
                      <select
                        id={food.itemName}
                        onChange={updateFoodStatusFromHost}
                        value={food.status}
                      >
                        <option>full</option>
                        <option>low</option>
                        <option>out</option>
                      </select>
                    </div>
                    <button
                      className="delete"
                      id={food.itemName}
                      onClick={deleteFood}
                    ></button>
                  </li>
                ))}
              </ol>
            </div>
            <br />
            <div className="notification is-primary">
              <form className="box" onSubmit={addFood}>
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

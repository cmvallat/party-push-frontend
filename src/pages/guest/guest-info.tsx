import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "../_app";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import { handleErrors } from "@/utils/utils";
import { headers } from "@/utils/utils";
import Router from "next/router";

export default function GuestInfo(props: IPageProps) {
  interface FoodItem {
    item_name: string;
    party_code: string;
    status: string;
  }

  interface GuestInfoI {
    foodList: FoodItem[];
    partyName: string;
  }

  const [guestInfo, setGuestInfo] = useState<GuestInfoI>({
    foodList: [],
    partyName: "",
  });

  useEffect(() => {
    getHost();
    getCurrentFoodList();
    checkIn();
  }, []);

  const getHost = () => {
    fetch(
      `party-push-backend.us-east-1.elasticbeanstalk.com/Party/get-host?party_code=${props.guestData.partyCode}`,
      {
        method: "GET",
        headers: headers(props),
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
  };

  const getCurrentFoodList = () => {
    fetch(
      `party-push-backend.us-east-1.elasticbeanstalk.com/Party/get-current-foods?party_code=${props.guestData.partyCode}`,
      {
        method: "POST",
        headers: headers(props),
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
      `party-push-backend.us-east-1.elasticbeanstalk.com/Party/update-food-status-from-guest?party_code=${props.guestData.partyCode}&status=${status}&guest_name=${props.guestData.guestName}&item_name=${itemName}`,
      {
        method: "POST",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            const updatedFoodList = guestInfo.foodList;
            updatedFoodList.forEach((item) => {
              if (item.item_name === itemName) {
                item.status = status;
              }
            });
            setGuestInfo((prevState) => ({
              ...prevState,
              foodList: updatedFoodList,
            }));
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
    fetch(
      `party-push-backend.us-east-1.elasticbeanstalk.com/Party/leave-party?party_code=${props.guestData.partyCode}&guest_name=${props.guestData.guestName}`,
      {
        method: "POST",
        headers: headers(props),
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
            Router.push(`/`);
          } else {
            handleErrors(res);
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  const checkIn = () => {
    fetch(
      `party-push-backend.us-east-1.elasticbeanstalk.com/Party/add-guest-from-check-in?party_code=${props.guestData.partyCode}&guest_name=${props.guestData.guestName}`,
      {
        method: "POST",
        headers: headers(props),
      }
    )
      .then((response) => {
        return response.json().then((res) => {
          if (response.status === 200) {
            toast("Checked into party successfully", {
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
              Welcome to {guestInfo.partyName}, {props.guestData.guestName}!
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
                      <select
                        id={item.item_name}
                        onChange={changeFoodStatusFromGuest}
                        value={item.status}
                      >
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

import { toast } from "react-toastify";
import { IPageProps } from "@/pages/_app";
import Router from "next/router";

interface Error {
  message: string;
}

export const handleErrors = (error: Error) => {
  if (error.message) {
    if (error.message === "User could not be validated") {
      Router.push("/login");
    } else {
      toast(error.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }
  } else {
    toast("An unknown error occured", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "error",
    });
  }
};

export const headers = (props: IPageProps) => {
  return {
    "Content-Type": `application/json`,
    "Authorization": `Bearer ${localStorage.getItem("token") as string}`,
  };
};

export interface HostParty {
  username: string;
  partyName: string;
  partyCode: string;
  phoneNumber: string;
  spotifyDeviceId: string;
  inviteOnly: number;
}

export interface GuestParty {
  username: string;
  guestName: string;
  partyCode: string;
  atParty: number;
}

import NavBar from '@/components/NavBar'
import Router from 'next/router';
import { IPageProps } from '../_app';
import { toast } from 'react-toastify';
import { FormEvent } from 'react';

export default function Guest({ guestData, setGuestData }: IPageProps) {
    const leaveParty = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(
            `https://localhost:5001/Demo/leave-party?party_code=${guestData.partyCode}&guest_name=${guestData.guestName}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        ).then((response) => {
            return response;
        }).then((data) => {
            setGuestData({
                guestName: "",
                partyCode: "",
                partyName: "",
            });
            Router.push(`/`);
        }).catch((error) => {
            console.log("Error:" + error)
            toast("Guest not found, please try again", { hideProgressBar: true, autoClose: 2000, type: 'error' })
        });
    }

    return (
        <>
            <NavBar />
            <section className="section">
                <form className="box" onSubmit={leaveParty}>
                    <h1>
                        {guestData.guestName}
                        {guestData.partyCode}
                    </h1>
                    <button className="button is-danger">
                        Report Food or Drink Outage
                    </button>
                    <button className="button is-danger" type="submit">
                        Leave Party
                    </button>
                </form>
            </section>
        </>
    )
}
import NavBar from '@/components/NavBar'
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FormEvent, useState } from 'react';
import { IPageProps } from './_app';
import Router from 'next/router';

export default function JoinParty({ guestData, setGuestData }: IPageProps) {
    const [guestInfo, setGuestInfo] = useState({
        guestName: "",
        partyCode: "",
    });

    const handleChange = (key: string, value: string) => {
        setGuestInfo({
            ...guestInfo,
            [key]: value,
        });
    }

    const joinParty = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(
            `https://localhost:5001/Demo/guest-check-in?party_code=${guestInfo.partyCode}&guest_name=${guestInfo.guestName}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        ).then((response) => {
            console.log(response);
        }).then((data) => {
            setGuestData({
                ...guestData,
                guestName: guestInfo.guestName,
                partyCode: guestInfo.partyCode,
                partyName: "RETURN PARTY INFO",
            })
            Router.push(`/guest/`)
        }).catch((error) => {
            console.log("Error:" + error)
            toast("Please try again", { hideProgressBar: true, autoClose: 2000, type: 'error' })
        });
    }

    return (
        <>
            <NavBar />
            <section className="section">
                <form className="box" onSubmit={joinParty}>
                    <div className="field">
                        <label className="label">Guest Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Guest Name"
                                onChange={e => handleChange('guestName', e.target.value)}
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
                                onChange={e => handleChange('partyCode', e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="button is-primary" type="submit">
                        Join Party
                    </button>
                </form>
                <form className="box">
                    <div className="notification is-primary">
                        Want to start a new party? Create one <Link href="/create-party">here</Link>!
                    </div>
                </form>
            </section>
        </>
    )
}
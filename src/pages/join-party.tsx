import NavBar from '@/components/NavBar'
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function JoinParty() {
    const [guestInfo, setGuestInfo] = useState({
        guestName: "",
        partyCode: "",
        atParty: false,
    });

    const handleChange = (key: string, value: string) => {
        setGuestInfo({
            ...guestInfo,
            [key]: value,
        });
    }

    const joinParty = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = {
            "guest_name": guestInfo.guestName,
            "party_code": guestInfo.partyCode,
            "at_party": guestInfo.atParty,
        }
        fetch(
            "https://localhost:5001/Demo/upsert-guest",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then((data) => {
            console.log(data);
        }).catch((error) => console.log("Error:" + error));
    }

    return (
        <>
            <NavBar />
            <section className="section">
                <form className="box" onSubmit={() => joinParty}>
                    <div className="field">
                        <label className="label">Guest Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="email"
                                placeholder="e.g. alex@example.com"
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
                    <div className="field">
                        <label className="label">Invite Only</label>
                        <div className="control">
                            <input
                                id="atParty"
                                className="checkbox"
                                type="checkbox"
                                onChange={e => handleChange('atParty', e.target.value)}
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
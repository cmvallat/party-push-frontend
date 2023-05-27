import NavBar from '@/components/NavBar'
import Link from 'next/link';
import Router from 'next/router';
import { FormEvent, useState } from 'react';

export default function CreateParty() {
    const [partyInfo, setPartyInfo] = useState({
        partyName: "",
        partyCode: "",
        phoneNumber: "",
        spotifyDeviceId: "",
        inviteOnly: false,
    });

    const handleChange = (key: string, value: string) => {
        setPartyInfo({
            ...partyInfo,
            [key]: value,
        });
    }

    const createParty = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = {
            "party_name": partyInfo.partyName,
            "party_code": partyInfo.partyCode,
            "phone_number": partyInfo.phoneNumber,
            "spotify_device_id": partyInfo.spotifyDeviceId,
            "invite_only": partyInfo.inviteOnly ? 1 : 0,
        }
        fetch(
            "https://localhost:5001/Demo/upsert-host",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            }
        ).then((response) => {
            if (response.ok && partyInfo.inviteOnly) {
                Router.push("/create-party/invite");
            } else if (response.ok) {
                Router.push("/create-party/provisions")
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
                <form className="box" onSubmit={createParty}>
                    <div className="field">
                        <label className="label">Party Name</label>
                        <div className="control">
                            <input
                                id="guestName"
                                className="input"
                                type="text"
                                placeholder="Party Name"
                                onChange={e => handleChange('partyName', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Party Code</label>
                        <div className="control">
                            <input
                                id="partyCode"
                                className="input"
                                type="text"
                                placeholder="Party Code"
                                onChange={e => handleChange('partyCode', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Phone Number</label>
                        <div className="control">
                            <input
                                id="phoneNumber"
                                className="input"
                                type="text"
                                placeholder="Phone Number"
                                onChange={e => handleChange('phoneNumber', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Spotify Device Id</label>
                        <div className="control">
                            <input
                                id="spotifyDeviceId"
                                className="input"
                                type="text"
                                placeholder="Spotify Device Id"
                                onChange={e => handleChange('spotifyDeviceId', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Invite Only</label>
                        <div className="control">
                            <input
                                id="inviteOnly"
                                className="checkbox"
                                type="checkbox"
                                onChange={e => handleChange('inviteOnly', e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="button is-primary" type="submit">
                        Create Party
                    </button>
                </form>
                <form className="box">
                    <div className="notification is-primary">
                        Want to joing an existing party? Click <Link href="/join-party">here</Link>!
                    </div>
                </form>
            </section>
        </>
    )
}
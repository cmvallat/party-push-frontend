import NavBar from '@/components/NavBar'
import { FormEvent, useState } from 'react';

export default function Invite() {
    const [inviteInfo, setInviteInfo] = useState({
        guestName: "",
    });

    const handleChange = (key: string, value: string) => {
        setInviteInfo({
            ...inviteInfo,
            [key]: value,
        });
    }

    const inviteGuest = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = {
            "guest_name": inviteInfo.guestName,
        }
        fetch(
            "https://localhost:5001/Demo/invite",
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
                <form className="box" onSubmit={() => inviteGuest}>
                    <div className="field">
                        <label className="label">Invite Guest</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Guest Name"
                                onChange={e => handleChange('guestName', e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="button is-primary" type="submit">
                        Invite Guest
                    </button>
                </form>
            </section>
        </>
    )
}
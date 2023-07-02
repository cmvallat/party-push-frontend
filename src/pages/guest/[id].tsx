import NavBar from '@/components/NavBar'
import Router from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Guest() {
    const [guestInfo, setGuestInfo] = useState({
        guestName: "",
        partyCode: "",
    });

    useEffect(() => {
        const data = window.location.href;
        console.log(data);
    })

    const leaveParty = () => {
        Router.push(`/`);
    }

    return (
        <>
            <NavBar />
            <section className="section">
                <form className="box" onSubmit={leaveParty}>
                    <button className="button is-danger" type="submit">
                        Leave Party
                    </button>
                </form>
            </section>
        </>
    )
}
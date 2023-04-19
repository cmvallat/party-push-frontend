import NavBar from '@/components/NavBar'
import { useEffect } from 'react';
import { useState } from 'react';

export default function CreateAccount() {
    useEffect(() => {
        createAccount();
    }, []);

    const [accountInfo, setAccountInfo] = useState({
       email: "",
       password: "",     
    });

    const handleChange = (key: string, value: string) => {
        setAccountInfo({
            ...accountInfo,
            [key]: value,
        });
    }

    const createAccount = () => {
        const body = {
            "party_name": "sickassparty1",
            "party_code": "ballsandboobs1",
            "phone_number": "888888888881",
            "spotify_device_id": "deeznuts1",
            "invite_only": 0
        }
        fetch(
            "https://localhost:5001/upsert-host",
            {
                method: "POST",
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
                <form className="box">
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input 
                                id="email" 
                                className="input" 
                                type="email" 
                                placeholder="e.g. alex@example.com"
                                onChange={e => handleChange('email', e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input 
                                className="input" 
                                type="password" 
                                placeholder="********" 
                                onChange={e => handleChange('email', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="********" />
                        </div>
                    </div>

                    <button className="button is-primary">Sign in</button>
                </form>
                <form className="box">
                    <div className="notification is-primary">
                        Already have an account? Sign in <a href="/login">here</a>.
                    </div>
                </form>
            </section>
        </>
    )
}
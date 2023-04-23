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

        //todo: don't hardcode, get from user input
        //ok to hardcode for local testing but dont push any sensitive info
        //also, have to send as one body, not individual parameters
        const host_body = {
            "party_name": "example_party_name",
            "party_code": "example_party_code",
            "phone_number": "example_phone_number",
            "spotify_device_id": "example_spotify_id",
            "invite_only": 1
        }

        const guest_body = {
            "party_code": "example_party_code",
            "guest_name": "example_guest_name",
            "at_party": 1
        }

        //the correct base endpoint is: https://localhost:5001/Demo/
        //and then add your endpoint path at the end
        fetch("https://localhost:5001/Demo/upsert-host",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(host_body)
        })
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
            })
            .then((data) => {
            console.log(data);
            })
            .catch((error) => console.log("Error:" + error));
        };

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
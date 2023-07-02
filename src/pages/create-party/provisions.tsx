import NavBar from '@/components/NavBar'
import { FormEvent, useState } from 'react';

export default function Provisions() {
    const [provisions, setProvisions] = useState({
        foodName: "",
    });

    const handleChange = (key: string, value: string) => {
        setProvisions({
            ...provisions,
            [key]: value,
        });
    }

    const addFood = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = {
            "food_name": provisions.foodName,
        }
        fetch(
            `https://localhost:5001/Demo/provisions`,
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
                <form className="box" onSubmit={() => addFood}>
                    <div className="field">
                        <label className="label">Add Food</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Food Name"
                                onChange={e => handleChange('foodName', e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}
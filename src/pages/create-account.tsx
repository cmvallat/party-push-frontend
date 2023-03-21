import NavBar from '@/components/NavBar'

export default function CreateAccount() {
    return (
        <>
            <NavBar />
            <section className="section">
                <form className="box">
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="e.g. alex@example.com" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="********" />
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
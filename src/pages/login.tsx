import NavBar from '@/components/NavBar'

export default function Login() {
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

                    <button className="button is-primary">Sign in</button>
                </form>
                <form className="box">
                    <div className="notification is-primary">
                        Dont have an account? Create one <a href="/create-account">here</a>.
                    </div>
                </form>
            </section>
        </>
    )
}
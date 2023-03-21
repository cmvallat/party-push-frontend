import NavBar from '@/components/NavBar'

export default function Home() {
  return (
    <>
      <NavBar />
      <section className="hero is-primary is-fullheight-with-navbar">
        <div className="hero-body">
          <p className="title">
            Welcome to Party Push!
          </p>
        </div>
      </section>
    </>
  )
}

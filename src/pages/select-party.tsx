import NavBar from "@/components/NavBar";
import { useEffect, useMemo, useRef, useState } from "react";
import { IPageProps } from "./_app";
import { GuestParty, HostParty, handleErrors, headers } from "@/utils/utils";

export default function SelectParty(props: IPageProps) {
  interface SelectPartyI {
    hostCards: HostParty[],
    guestCards: GuestParty[],
  };

  const [selectPartyInfo, setSelectPartyInfo] = useState<SelectPartyI>({
    hostCards: [],
    guestCards: [],
  });

  useEffect(() => {
    getParties();
  }, []);

  const getParties = () => {
    fetch(`https://localhost:5001/Party/get-party-objects?username=nick`, {
      method: "GET",
      headers: headers(props),
    })
      .then((response) => {
        const status = response.status;
        return response.json().then((res) => {
          if (status === 200) {
            const hostCards: HostParty[] = res.message[0].map((party: any) => {
              return {
                username: party.username,
                partyName: party.party_name,
                partyCode: party.party_code,
                phoneNumber: party.phone_number,
                spotifyDeviceId: party.spotify_device_id,
                inviteOnly: party.invite_only,
              };
            });
            const guestCards: GuestParty[] = res.message[1].map((party: any) => {
              return {
                username: party.username,
                guestName: party.guest_name,
                partyCode: party.party_code,
                atParty: party.at_party,
              };
            });
            setSelectPartyInfo((prevState) => ({
              ...prevState,
              hostCards: hostCards,
              guestCards: guestCards,
            }));
          } else {
            handleErrors(res);
          }
        });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  const buildHostMatrix = (parties: HostParty[]) => {
    const matrix: HostParty[][] = [];

    while (parties.length) {
      matrix.push(parties.splice(0, 3));
    }
    return matrix;
  };

  const buildGuestMatrix = (parties: GuestParty[]) => {
    const matrix: GuestParty[][] = [];

    while (parties.length) {
      matrix.push(parties.splice(0, 3));
    }
    return matrix;
  };

  return (
    <>
      <NavBar />
      <section className="section">
        <div className="box">
          <h1 className="title">Attending</h1>
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              {buildGuestMatrix(selectPartyInfo.guestCards).map((row, index) => {
                return (
                  <div className="tile" key={index}>
                    {row.map((party) => {
                      return (
                        <a
                          className="tile is-parent is-4"
                          key={party.partyCode}
                          href="/guest/guest-login"
                        >
                          <article className="tile is-child notification is-primary">
                            <p className="title">{party.partyCode}</p>
                            <p className="subtitle">
                              Username: {party.username}
                              <br />
                              Guest Name: {party.guestName}
                              <br />
                              At Party: {party.atParty ? "Yes" : "No"}
                              <br />
                            </p>
                          </article>
                        </a>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="box">
          <h1 className="title">Hosting</h1>
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              {buildHostMatrix(selectPartyInfo.hostCards).map((row, index) => {
                return (
                  <div className="tile" key={index}>
                    {row.map((party) => {
                      return (
                        <a
                          className="tile is-parent is-4"
                          key={party.partyCode}
                          href="/host/host-login"
                        >
                          <article className="tile is-child notification is-info">
                            <p className="title">{party.partyCode}</p>
                            <p className="subtitle">
                              Username: {party.username}
                              <br />
                              Party Name: {party.partyName}
                              <br />
                              Phone Number: {party.phoneNumber}
                              <br />
                              Spotify Device Id: {party.spotifyDeviceId}
                              <br />
                              Invite Only: {party.inviteOnly ? "Yes" : "No"}
                              <br />
                            </p>
                          </article>
                        </a>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

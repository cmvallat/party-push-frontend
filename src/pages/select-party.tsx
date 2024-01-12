import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "./_app";
import { GuestParty, HostParty, handleErrors, headers } from "@/utils/utils";
import Router from "next/router";

export default function SelectParty(props: IPageProps) {
  interface SelectPartyI {
    hostCards: HostParty[];
    guestCards: GuestParty[];
  }

  const [selectPartyInfo, setSelectPartyInfo] = useState<SelectPartyI>({
    hostCards: [],
    guestCards: [],
  });

  useEffect(() => {
    getParties();
  }, []);

  const getParties = () => {
    fetch(
      `party-push-backend.us-east-1.elasticbeanstalk.com/Party/get-party-objects?username=nick`,
      {
        method: "GET",
        headers: headers(props),
      }
    )
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
            const guestCards: GuestParty[] = res.message[1].map(
              (party: any) => {
                return {
                  username: party.username,
                  guestName: party.guest_name,
                  partyCode: party.party_code,
                  atParty: party.at_party,
                };
              }
            );
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
          <div className="level-left">
            <h1 className="title level-item">Attending</h1>
            <button
              className="button level-item is-primary"
              onClick={() => Router.push("/guest/join-party")}
            >
              +
            </button>
          </div>
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              {selectPartyInfo.guestCards.length > 0 ? (
                buildGuestMatrix(selectPartyInfo.guestCards).map(
                  (row, index) => {
                    return (
                      <div className="tile" key={index}>
                        {row.map((party) => {
                          return (
                            <div
                              className="tile is-parent is-4"
                              key={party.partyCode}
                              onClick={() => {
                                props.setGuestData({
                                  ...props.guestData,
                                  guestName: party.guestName,
                                  partyCode: party.partyCode,
                                });
                                Router.push("/guest/guest-info");
                              }}
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
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )
              ) : (
                <div className="tile is-vertical">
                  <div className="level-center">
                    <h1 className="title level-item">No parties to show</h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="box">
          <h1 className="title">Hosting</h1>
          <div
            className="icon-text"
            onClick={() => {
              Router.push("/host/create-party");
            }}
          >
            <span className="icon">
              <i className="fas fa-plane-departure"></i>
            </span>
            <span>flying</span>
          </div>
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              {selectPartyInfo.hostCards.length > 0 ? (
                buildHostMatrix(selectPartyInfo.hostCards).map((row, index) => {
                  return (
                    <div className="tile" key={index}>
                      {row.map((party) => {
                        return (
                          <a
                            className="tile is-parent is-4"
                            key={party.partyCode}
                            onClick={() => {
                              props.setHostData({
                                ...props.hostData,
                                inviteOnly: party.inviteOnly,
                                partyCode: party.partyCode,
                              });
                              Router.push("/host/host-info");
                            }}
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
                })
              ) : (
                <div className="tile is-vertical">
                  <div className="level-center">
                    <h1 className="title level-item">No parties to show</h1>
                  </div>
                </div>
              )}
              <></>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

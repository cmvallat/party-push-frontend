import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IPageProps } from "./_app";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import Router from "next/router";
import { handleErrors } from "@/utils/utils";

export default function SelectParty({ hostData }: IPageProps) {
  interface Party {
    role: string;
    created: string;
    partyName: string;
    startDate: string;
    startTime: string;
    invited: number;
    attending: number;
  }

  const defaultParties: Party[] = [
    {
      role: "attending",
      created: "10/14/23",
      partyName: "Haloween Party",
      startDate: "10/31/23",
      startTime: "",
      invited: 30,
      attending: 15,
    },
    {
      role: "hosting",
      created: "10/23/23",
      partyName: "Christmas Party",
      startDate: "12/25/23",
      startTime: "",
      invited: 100,
      attending: 60,
    },
    {
      role: "attending",
      created: "10/17/23",
      partyName: "Lame Ass Party",
      startDate: "10/31/23",
      startTime: "",
      invited: 2,
      attending: 1,
    },
    {
      role: "hosting",
      created: "10/8/23",
      partyName: "Nick's Party",
      startDate: "11/14/23",
      startTime: "",
      invited: 1000,
      attending: 1000,
    },
    {
      role: "attending",
      created: "10/7/23",
      partyName: "Christian's Party",
      startDate: "11/14/23",
      startTime: "",
      invited: 20,
      attending: 0,
    },
    {
      role: "attending",
      created: "10/14/23",
      partyName: "Haloween Party",
      startDate: "10/31/23",
      startTime: "",
      invited: 30,
      attending: 15,
    },
    {
      role: "hosting",
      created: "10/23/23",
      partyName: "Christmas Party",
      startDate: "12/25/23",
      startTime: "",
      invited: 100,
      attending: 60,
    },
    {
      role: "attending",
      created: "10/17/23",
      partyName: "Lame Ass Party",
      startDate: "10/31/23",
      startTime: "",
      invited: 2,
      attending: 1,
    },
    {
      role: "hosting",
      created: "10/8/23",
      partyName: "Nick's Party",
      startDate: "11/14/23",
      startTime: "",
      invited: 1000,
      attending: 1000,
    },
    {
      role: "attending",
      created: "10/7/23",
      partyName: "Christian's Party",
      startDate: "11/14/23",
      startTime: "",
      invited: 20,
      attending: 0,
    },
    {
      role: "attending",
      created: "10/7/23",
      partyName: "Christian's Party",
      startDate: "11/14/23",
      startTime: "",
      invited: 20,
      attending: 0,
    },
  ];

  const buildMatrix = (parties: Party[]) => {
    const matrix = [];

    while (parties.length) {
      matrix.push(parties.splice(0, 3));
    }
    return matrix;
  };

  const attendingMatrix = buildMatrix(
    defaultParties.filter((party) => {
      return party.role === "attending";
    })
  );
  const hostingMatrix = buildMatrix(
    defaultParties.filter((party) => {
      return party.role === "hosting";
    })
  );

  return (
    <>
      <NavBar />
      <section className="section">
        <div className="box">
          <h1 className="title">Attending</h1>
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              {attendingMatrix.map((row) => {
                return (
                  <div className="tile">
                    {row.map((party) => {
                      return (
                        <div className="tile is-parent is-4">
                          <article className="tile is-child notification is-primary">
                            <p className="title">{party.partyName}</p>
                            <p className="subtitle">
                              Created: {party.created}
                              <br />
                              Start Date: {party.startDate}
                              <br />
                              Start Time: {party.startTime}
                              <br />
                              Invited: {party.invited}
                              <br />
                              Attending: {party.attending}
                              <br />
                            </p>
                          </article>
                        </div>
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
              {hostingMatrix.map((row) => {
                return (
                  <div className="tile">
                    {row.map((party) => {
                      return (
                        <a
                          className="tile is-parent is-4"
                          href="/host/host-login"
                        >
                          <article className="tile is-child notification is-info">
                            <p className="title">{party.partyName}</p>
                            <p className="subtitle">
                              Created: {party.created}
                              <br />
                              Start Date: {party.startDate}
                              <br />
                              Start Time: {party.startTime}
                              <br />
                              Invited: {party.invited}
                              <br />
                              Attending: {party.attending}
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

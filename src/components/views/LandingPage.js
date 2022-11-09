import React, { useState } from "react";
import DemoPie from "./Charts/DonutChart";
import Forbidden from "./PageNotFound/Forbidden";
import Mqtt from "./SelectPage/MQTT";
import ReferenceCarAccess from "./ReferencePage/ReferenceCarAccess";
import { useSelector } from "react-redux";
import IntervalFunction from "../IntervalFunction";

const LandingPage = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  const { state } = useSelector(({ userReducers }) => ({
    state: userReducers?.findparkingaccesscar,
  }));

  return (
    <>
      {token ? (
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ReferenceCarAccess cardata={state} />
          <Mqtt />
          {true && <IntervalFunction />}
        </div>
      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default LandingPage;

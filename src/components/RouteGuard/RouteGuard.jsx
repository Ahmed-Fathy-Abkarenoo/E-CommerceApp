import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Login from "../Login/Login";

export default function RouteGuard({ children }) {
  const { userToken } = useContext(AuthContext);

  return <>{userToken ? children : <Login />} </>;
}

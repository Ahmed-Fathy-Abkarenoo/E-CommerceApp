import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Login from "../Login/Login";

export default function RouteGuard({ children }) {
  const [counter, setCounter] = useState(0);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {}, []);

  return <>{userToken ? children : <Login />} </>;
}

import React from "react";
import { useState, useEffect } from "react";

export default function Orders() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {}, []);

  return (
    <>
      <section className="mt-10 mb-6">
        <h2>Orders</h2>
      </section>
    </>
  );
}

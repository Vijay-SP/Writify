/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Carausal.css";

const Carausal = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);
  return (
    <section id="hero" class="d-flex align-items-center">
      <div class="container" data-aos="zoom-out" data-aos-delay="100">
        <h1>Welcome to <span>Writify</span></h1>
        <h2>read amazing blogs, shayaris, kavitas, quotes,etc. and write your own</h2>
      </div>
    </section>
  );
};

export default Carausal;

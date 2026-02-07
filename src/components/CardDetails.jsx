import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CardDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, seterror] = useState("");
  return <div>CardDetails</div>;
};

export default CardDetails;

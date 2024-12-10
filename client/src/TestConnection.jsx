import React, { useEffect, useState } from "react";
import axios from "axios";

const TestConnection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:6000/api/test") // Replace with your API endpoint
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Test Connection</h1>
      {data ? <p>Response: {JSON.stringify(data)}</p> : <p>Loading...</p>}
    </div>
  );
};

export default TestConnection;

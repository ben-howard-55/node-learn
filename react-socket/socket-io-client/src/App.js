import "./App.css";
import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

// socket is opened on the express server domain,
// Must include the transports: ["websockets"] in order to
// not violate CORS, (In this case, the express is on :3000,
// and the react server on :3001)
const socket = openSocket("http://localhost:3000", {
  transports: ["websocket"],
});

function App() {
  const [res, setRes] = useState("");

  // on component mount, connect to the socket
  useEffect(() => {
    // define socket behaviour
    socket.on("FromAPI", (msg) => {
      setRes(msg);
    });

    // clean up the socket, on component unmount
    return () => socket.disconnect();
  }, []);

  // display the result of the socket information
  return (
    <div className="App">
      <header className="App-header">
        <p>
          It's <time dateTime={res}>{res}</time>
        </p>
      </header>
    </div>
  );
}

export default App;

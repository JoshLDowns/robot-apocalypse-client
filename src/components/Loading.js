import React from 'react'

import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <div
          style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#c3c3c3",
            zIndex: "10000",
          }}
        >
          <br />
          <CircularProgress color="primary" size={100} />
        </div>
  )
}

export default Loading;
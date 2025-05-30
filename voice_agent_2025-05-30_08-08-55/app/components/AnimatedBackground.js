"use client";

import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { withBasePath } from "../utils/deepgramUtils";

const AnimatedBackground = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a simple container when not mounted (server-side)
    return (
      <div style={{ backgroundColor: "black" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Player
        autoplay
        loop
        src={withBasePath("/sts-bg.json")}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        className="animatedBackground"
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "black",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
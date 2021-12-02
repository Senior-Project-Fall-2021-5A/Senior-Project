import React from "react";
import { StyleSheet, css } from "aphrodite";

import Constants from "../constants";

const loadKeyframes = {
  "0%": {
    transform: "rotate(0deg)"
  },

  "100%": {
    transform: "rotate(360deg)"
  }
};

const sharedStyles = {
  beforeAfter: {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0
  }
};

const styles = StyleSheet.create({
  loader: {
    fontSize: "10px",
    margin: "50px auto",
    position: "relative",
    width: "11em",
    height: "11em",
    textIndent: "-9999em",
    transform: "translateZ(0)",
    borderRadius: "50%",
    background: Constants.foreground,

    background: `linear-gradient(to right, ${Constants.foreground} 10%, rgba(255, 255, 255, 0) 42%)`,
    animationName: loadKeyframes,
    animationDuration: "1.4s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    animationDirection: "initial",
    animationPlayState: "initial",

    ":before": {
      ...sharedStyles.beforeAfter,
      width: "50%",
      height: "50%",
      background: Constants.foreground,
      borderRadius: "100% 0 0 0"
    },
    ":after": {
      ...sharedStyles.beforeAfter,
      background: Constants.background,
      width: "75%",
      height: "75%",
      borderRadius: "50%",
      margin: "auto",
      bottom: 0,
      right: 0
    }
  }
});

const Loader3 = () => {
  return <div className={css(styles.loader)} />;
};

export default Loader3;

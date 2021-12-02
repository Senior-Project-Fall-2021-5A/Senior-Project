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
  base: {
    borderRadius: "50%"
  },
  beforeAfter: {
    content: "''",
    position: "absolute"
  }
};

const styles = StyleSheet.create({
  loader: {
    ...sharedStyles.base,

    color: Constants.foreground,
    fontSize: "11px",
    margin: "55px auto",
    position: "relative",
    width: "10em",
    height: "10em",
    textIndent: "-99999em",
    transform: "translateZ(0)",
    boxShadow: "inset 0 0 0 1em",
    ":before": {
      ...sharedStyles.base,
      ...sharedStyles.beforeAfter,
      width: "5.2em",
      height: "10.2em",
      background: Constants.background,
      borderRadius: "10.2em 0 0 10.2em",
      top: "-0.1em",
      left: "-0.1em",
      transformOrigin: "5.2em 5.1em",
      animationName: loadKeyframes,
      animationDuration: "2s",
      animationIterationCount: "infinite",
      animationTimingFunction: "ease",
      animationDelay: "1.5s",
      animationDirection: "initial",
      animationPlayState: "initial"
    },
    ":after": {
      ...sharedStyles.base,
      ...sharedStyles.beforeAfter,
      width: "5.2em",
      height: "10.2em",
      background: Constants.background,
      borderRadius: "0 10.2em 10.2em 0",
      top: "-0.1em",
      left: "5.1em",
      transformOrigin: "0px 5.1em",
      animationName: loadKeyframes,
      animationDuration: "2s",
      animationIterationCount: "infinite",
      animationTimingFunction: "ease",
      animationDirection: "initial",
      animationPlayState: "initial"
    }
  }
});

const Loader2 = () => {
  return <div className={css(styles.loader)} />;
};

export default Loader2;

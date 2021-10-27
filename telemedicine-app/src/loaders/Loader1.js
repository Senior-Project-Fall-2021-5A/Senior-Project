import React from "react";
import { StyleSheet, css } from "aphrodite";

import Constants from '../constants';

const loadKeyframes = {
  "0%": {
    boxShadow: "0 0",
    height: "4em"
  },
  "80%": {
    boxShadow: "1 1",
    height: "4em"
  },
  "100%": {
    boxShadow: "0 0",
    height: "4em"
  },
  "40%": {
    boxShadow: "0 -3em",
    height: "5em"
  }
};

const sharedStyles = {
  base: {
    background: Constants.foreground,
    width: "2.5em",
    height: "9em",
    animationName: loadKeyframes,
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    animationDelay: "initial",
    animationDirection: "initial",
    animationPlayState: "initial"
  },
  beforeAfter: {
    content: "''",
    position: "absolute",
    top: 0
  }
};

const styles = StyleSheet.create({
  loader: {
    ...sharedStyles.base,
    color: Constants.foreground,
    fontSize: "11px",
    margin: "88px auto",
    position: "relative",
    textIndent: "-9999em",
    transform: "translateZ(0)",
    animationDelay: "-0.16s",
    ":before": {
      ...sharedStyles.base,
      ...sharedStyles.beforeAfter,
      left: "-3.5em",
      animationDelay: "-0.32s"
    },
    ":after": {
      ...sharedStyles.base,
      ...sharedStyles.beforeAfter,
      left: "3.5em"
    }
  }
});

const Loader1 = () => {
  return <div className={css(styles.loader)} />;
};

export default Loader1;

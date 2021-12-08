import {React,Component} from "react";
import { render } from "react-dom";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import { StyleSheet, css } from "aphrodite";

import { Loader1 } from "../../loaders/index";
import context from "react-bootstrap/esm/AccordionContext";

const styles = StyleSheet.create({
    container: {
      fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
      fontSize: "16px",
      fontWeight: 300,
      color: "white",
      lineHeight: 1.25,
      letterSpacing: "1px",
      height:'100%'
    },
    masthead: {
      marginBottom: "2em"
    },
    header: {
      fontWeight: 300
    },
    link: {
      color: "white",
      fontWeight: "500",
      textDecoration: "none",
      ":hover": {
        textDecoration: "underline"
      }
    },
    loadContainer: {
      height: "240px",
      overflow: "hidden",
      boxSizing: "border-box"
    }
  });
  
class LoginLoading extends Component {
    state = {
      redirect: false
    }
  
    componentDidMount() {
      this.id = setTimeout(() => this.setState({ redirect: true }), 2100)
    }
  
    componentWillUnmount() {
      clearTimeout(this.id)
    }
  
    render() {
      
      return this.state.redirect
        ? <Redirect to="/homepage" />
        : <div className ='loading-page' style ={{background: 'linear-gradient(90deg, rgb(110, 94, 254) 60%, rgb(73, 63, 252) 100%)', height:'100vh', width:'100%'}}>
            <div className={css(styles.container)}>
    <Row className ='loading-page-row' style= {{justifyContent:'center', height:'100%', alignItems:'center'}}>
      <Col xs={12} sm={6} md={3}style= {{height:'100%'}} className={css(styles.loadContainer)}>
        <Loader1 />
      </Col>
    </Row>
  </div>
        </div>
    }
  }
  

  export default LoginLoading
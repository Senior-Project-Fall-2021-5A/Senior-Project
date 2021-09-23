import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css';
import Profile from './Profile';
import navLogo from '../../images/company-logo.png';

class Navbar extends Component {
    state ={ clicked: false}

    handleClick= () => {
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className= "NavbarItems">
                <h1 className="navbar-logo"> Health Inc. <img className ='nav-logo-img'src ={navLogo} alt='navlogo'/> </h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li classname='nav-list'key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                    <Profile/>
                </ul>
            </nav>
        )
    }
}

export default Navbar;
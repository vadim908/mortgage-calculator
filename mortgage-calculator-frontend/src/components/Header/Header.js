import React from 'react';
import NavBar from '../Navbar/NavBar';
import logo from '../../image/calculator.svg'
import './Header.css';
import {Container} from 'react-bootstrap';


function Header(props) {
  return (
    <header className="header header-lg">
        <Container className="d-flex flex-row justify-content-between">
        <img className="navBar__img" src={logo} alt="Ипотечный калькулятор"/>
        <h2 className="text-white text-center align-self-center justify-content-center">{props.currentUser.name}</h2>
        <NavBar
        loginin={props.loginin}
        setLogin={props.setLogin}
        setCurrentUser={props.setCurrentUser}
        />
        </Container>
        


    </header>

  );
}

export default Header;

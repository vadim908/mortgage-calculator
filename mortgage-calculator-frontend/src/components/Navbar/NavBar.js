
import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';

import './NavBar.css'
import { useHistory } from "react-router-dom";

function NaviBar (props) {

    const history = useHistory();

    function handleSignOut(){
        props.setLogin(false)
        localStorage.removeItem('jwt')
        history.push("/sign-in");
        props.setCurrentUser('')
      };

    return(
        <>
            <Navbar  expand="lg" variant="dark">
                <Nav className="d-flex flex-row ">
                        { props.loginin ? 
                        ''
                         : 
                         (<Button onClick={()=> history.push('/sign-in')} className="navBar__link me-2" variant="primary"> 
                            Log in
                        </Button>)}
                        { props.loginin ? 
                        (<Button onClick={handleSignOut} className="navBar__link" id="1" variant="primary">
                            Sign out
                        </Button>)
                        :
                        (<Button onClick={()=> history.push('/sign-up')} id="2" className="navBar__link" variant="primary">
                           Sign up
                        </Button>)
                    }
                </Nav>

            </Navbar>
        </>
    )
    
}

export default NaviBar;
import React from "react";
import { Form, Container, Button, Spinner } from 'react-bootstrap'
import './Login.css'

function Login(props) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
      });
    const [formValid, setFormValid] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

const  handleChange = (e) => {
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(
      e.target.value
    );

    const {name, value} = e.target;
    setData({
        ...data,
          [name]: value 
        });

        if(e.target.id === "formBasicEmail"){
          if (!validEmail) {
            setEmailError("Неверный формат почты");
            setFormValid(false);
          } else {
            setEmailError("");
            setFormValid(true);
          }
        }
    
        if(e.target.id === "formBasicPassword"){
          if (e.target.value.length < 6) {
            setPasswordError("Пароль должен быть не менее 6 символов");
            setFormValid(false);
          } else {
            setPasswordError("");
            setFormValid(true);
          }
        }
    }

const handleSubmit = (e) => {
    let {email, password } = data;
    
    e.preventDefault()

    if(email !== '' && password !== '' && email !== undefined && password !== undefined){
    props.onLogin(email, password)
    }
    }

  return (
    <section >
     <h1 className="col mx-auto pb-5 pt-5 text-center">Авторизация</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column col-10 col-sm-10 col-md-8 col-lg-5 col-xl-5 mx-auto mx-auto">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control  type="email" name='email' onChange={handleChange} placeholder="Enter email" />
                <Form.Text className="error">{emailError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control onChange={handleChange}  name='password' type="password" placeholder="Password" />
                <Form.Text className="error">{passwordError}</Form.Text>
            </Form.Group>
                
        
        {props.load ? (<Spinner className="mx-auto" animation="border" variant="primary" />)
        :
        (<Button disabled={!formValid} className="mx-auto mt-3 w-50" type="submit">Войти</Button>)}
        
        
        <Container className="mx-auto mt-3 error">{props.message}</Container>

        </Form>
    </section>
  );
}

export default Login;
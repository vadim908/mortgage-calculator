import React, {useState} from "react";
import { Form, Button, Container, Spinner } from 'react-bootstrap'


function Register(props) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        name: '',
      });
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formValid, setFormValid] = useState(false);

    const  handleChange = (e) => {
        const validName = /^[a-zA-Z- ]+$/.test(e.target.value);
        const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(
        e.target.value
        );

        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value 
            });
        
            if(e.target.id === "formBasicName"){
                if (e.target.value.length < 2) {
                  setNameError("Длина имени должна быть не менее 2 символов");
                  setFormValid(false);
                } else if (e.target.value.length > 30) {
                  setNameError("Длина имени должна должна быть не более 30 символов");
                  setFormValid(false);
                } else if (!validName) {
                  setNameError("Имя должно быть указано латиницей");
                  setFormValid(false);
                } else {
                  setNameError("");
                  setFormValid(true);
                }
              }
          
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
        let {name, email, password } = data; 
        e.preventDefault()

            
        if(name !== '' && email !== '' && password !== '' && name !== undefined && email !== undefined && password !== undefined){
            props.onRegister(name, email, password)
        }
           
    }

  return (
    <section >
     <h1 className="col mx-auto pb-5 pt-5 text-center">Регистрация</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column col-10 col-sm-10 col-md-8 col-lg-5 col-xl-5 mx-auto">

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="name" name='name'  onChange={handleChange} placeholder="name" />
                <Form.Text className="error">{nameError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email'  onChange={handleChange} placeholder="Enter email" />
                <Form.Text className="error">{emailError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control onChange={handleChange}  name='password' type="password" placeholder="Password" />
                <Form.Text className="error">{passwordError}</Form.Text>
            </Form.Group>
                
        
        {props.load ? (<Spinner className="mx-auto" animation="border" variant="primary" />)
        :
        (<Button disabled={!formValid}  className="mx-auto mt-3  w-sm-100" type="submit">Зарегистрироваться</Button>)}
        
        <Container className="mx-auto mt-3 error">{props.message}</Container>
        </Form>
    </section>
  );
}

export default Register;
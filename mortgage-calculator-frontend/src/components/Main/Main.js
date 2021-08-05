import React, {useState } from "react";
import { Form, FloatingLabel, Container, Button, Spinner } from 'react-bootstrap'



function Main(props) {

    const [data, setData] = useState({
        purpose: 'Покупка строящегося жилья',
        region: 'Москва',
        price: 300000,
        contribution: 12,
        period: 2,
        result: 3000,
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        let res = Math.floor((data.price / 100) * data.contribution);

        data.result = res;


        props.addData(data)
        // props.addData()
    }

    const  handleChange = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
              [name]: value,
            });
    }

  return (
    <section >
     <h1 className="col mx-auto pb-5 pt-sm-3 pt-5 text-center">Ипотечный калькулятор</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column col-10 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto">
        <Form.Group >
        <FloatingLabel controlId="floatingSelect" label="Цель кредита">
            <Form.Select onChange={handleChange} name="purpose" aria-label="Floating label select example">
            <option value="Покупка строящегося жилья">Покупка строящегося жилья</option>
            <option value="Покупка готового жилья">Покупка готового жилья</option>
            <option value="Рефинансирование">Рефинансирование</option>
        </Form.Select>
        </FloatingLabel>
        </Form.Group>
        
        <Form.Group className="mt-3">
            <FloatingLabel controlId="floatingSelect" label="Регион приобретения недвижимости">
                <Form.Select name="region" onChange={handleChange} aria-label="Floating label select example">
                <option value="Москва">Москва</option>
                <option value="Мурманск">Мурманск</option>
                <option value="Кострома">Кострома</option>
                <option value="Самара">Самара</option>
            </Form.Select>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="row mt-3">
        <Form.Group className="col">
        <FloatingLabel controlId="floatingControl" label="Стоимость недвижимости">
            <Form.Control name="price" className="pb-0 border-0" type="number" onChange={handleChange} value={data.price}/>
            <Form.Range min="300000" name="price" onChange={handleChange} value={data.price} step="1" max="99000000"/>
        </FloatingLabel>
        </Form.Group>

        <Form.Group className="col-xl-6 col-md-6 col-lg-6 col-sm-12">
        <FloatingLabel className="row" controlId="floatingControl" label="Остаток по ипотеке">
            <Form.Control name="result" className="pb-0 bg-white border-0 col" type="number" readOnly value={Math.floor((data.price / 100) * data.contribution)}/>
            <Form.Text name="contribution" className="pb-2 border-0 col d-flex justify-content-end align-items-end" muted>{data.contribution}%</Form.Text>
        </FloatingLabel>
        
            <Form.Range name="contribution" min="10" onChange={handleChange} value={data.contribution} step="1" max="90"/>
        </Form.Group>

        <Container className="w-100 d-none d-md-block"></Container>
        <Form.Group className="col-xl-6 col-md-6 col-lg-6 col-sm-12">
        <FloatingLabel controlId="floatingControl" label="Срок нового кредита">
            <Form.Control name="period" className="pb-0 border-0" onChange={handleChange} type="number" value={data.period}/>
            <Form.Range name="period" min="1" onChange={handleChange} value={data.period} step="1" max="30"/>
        </FloatingLabel>
        </Form.Group>
        
        <Form.Group className="col-xl-6 col-md-6 col-lg-6 col-sm-12">
        <FloatingLabel controlId="floatingControl" label="Сумма кредита">
            <Form.Control className="pb-0 border-0 bg-white" name="result" type="number" readOnly='boolean' readOnly value={Math.floor((data.price / 100) * data.contribution)}/>
        </FloatingLabel>
        </Form.Group>

        </Form.Group>
        
        
        {props.load ? (<Spinner className="mx-auto" animation="border" variant="primary" />)
        :
        (<Button className="mx-auto mt-3 w-50" type="submit">Заявка</Button>)}
        
        

        </Form>
    </section>
  );
}

export default Main;

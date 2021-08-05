import React,{useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as api from "../../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const history = useHistory();

  const handleLogin = (email, password) => {
    localStorage.removeItem("jwt");
    setLoad(true)
    return api.authorize(email, password) 
     .then((data) => { 
       if (data.token){
        setLoggedIn(true)
        setLoad(false)
        localStorage.setItem('jwt', data.token);
        history.push('/content');
       }})
      .catch((err) => {
        setMessage("При авторизации произошла ошибка");
        if (err === 401) {
          setMessage("Пользователь с таким email не найден");
        }
        if (err === 400) {
          setMessage("Неверный email или пароль");
        }
        localStorage.removeItem("jwt");
      });
}

  const handleRegist = (name, email, password) => {
    setLoad(true)
    return api.register(name, email, password)
    .then((res) => {
            setMessage('Вы успешно зарегистрировались!');
            setCurrentUser(res)
            api.authorize(email, password) 
     .then((data) => { 
       if (data.token){
        setLoggedIn(true)
        setLoad(false)
        localStorage.setItem('jwt', data.token);
        history.push('/content'); 
       }})
      .catch((err) => {
        setMessage("При авторизации произошла ошибка");
        if (err === 401) {
          setMessage("Пользователь с таким email не найден");
        }
        if (err === 400) {
          setMessage("Неверный email или пароль");
        }
        localStorage.removeItem("jwt");
      });
 
      }
    )
    .catch((err) => {
      if (err === 409) {
        setMessage("Пользователь с таким email уже существует");
      } else {
        setMessage("При регистрации пользователя произошла ошибка");
      }
    });
  }

  React.useEffect(()=> { 
    const jwt = localStorage.getItem('jwt'); 
    if(jwt){ 
      return  api.getContent(jwt).then((res) => {
      if (res){ 
        setCurrentUser(res)
        } 
        setLoggedIn(true)
        setLoad(false) 
        history.push("/content") 
      }) 
      .catch((err)=>{ 
        console.log(err.message);
        history.push("/sign-in") 
      }) 
    } 
  }, [loggedIn])

  function addDataUser(data) {
    const jwt = localStorage.getItem('jwt');
    setLoad(true)
    return api.postDataUser(data, jwt)
    .then((res) => {
      setLoad(false)
      setData(res);
    })
    .catch((err)=>{ 
      console.log(`Ошибка: ${err}`);
    }) 
  }

  

  return (
    <div className="App">
      <Header 
      loginin={loggedIn}
      setLogin={setLoggedIn}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      />
      <Switch>
        <Route path="/sign-up">
          <Register 
          onRegister = {handleRegist}
          message={message}
          load={load}
          />
        </Route>
    
        <Route exact path="/sign-in">
        <Login
          onLogin={handleLogin}
          message={message}
          load={load}
        />
        </Route>

        <ProtectedRoute
        path="/content"
        component={Main}
        loggedIn={loggedIn}
        addData = {addDataUser}
        load={load}
        />

      </Switch>
      


    </div>
  );
}

export default App;

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css';
import {Link} from "react-router-dom";
import {createRef} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Login() {
  const nikRef = createRef();
  const passwordRef = createRef();
  const {setUser, setToken} = useStateContext()

  const onSubmit = ev => {
    ev.preventDefault()
    const payload = {
      nik: nikRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
      setToken(data.token)
      setUser(data.user)
    }).catch(error => {
      const res = error.response;
      if (res && res.status === 422) {
        console.log(res.data.errors);
      }
    })
  }

  return (
    <div className="login-page">
      <div className="form">
        <h1>Login</h1>
        <Form className="login-form" onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Control ref={nikRef} type="text" placeholder="NIK"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control ref={passwordRef} type="password" placeholder="Password"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <p className="message">Belum Terdaftar? <Link to="/daftar">Buat Akun</Link></p>
        </Form>
      </div>
    </div>
  )
}

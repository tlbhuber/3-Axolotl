import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom'

export default function Login(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()

async function handleSubmit(e){
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/search") // "push" the user to our root page if login is successful
        } catch {
            setError("Failed to login, check username and password")
        }

        setLoading(false)
    }

    return (
        <>
       <Container id="container">
    <Card id="card">
        <Card.Body id="sign-up">
            <h2 id="head" className="text-center mb-3">Log In</h2>
            {/* If there is an error with handleSubmit show it as a red alert */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="you@email.com" required />
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="*********"required />
                </Form.Group>

                <Button disabled={loading} className="w-100" type="submit" variant="success">Log in!</Button>
            </Form>
            <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </Card.Body>
    </Card>
    </Container> 
    <div id="sign" className="w-100 text-center mt-2">
        Don't have an account? What are you waiting for? <Link to="/signup" >Sign up!</Link>
    </div>
    
        </>
    )
}
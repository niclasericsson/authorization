import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Column, Row } from 'simple-flexbox';
import Button from 'react-bootstrap/Button';
import { Logo, Bat } from '../components/assets'
import Layout from '../components/Layout.js'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            signedIn: false,
            isLoading: true,
            email: '',
            password: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidMount() {
        fetch('/api/verify')
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        isLoading: false,
                        signedIn: true
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        signedIn: false
                    })
                }
            })
     }

    signIn(){
        this.setState({ isLoading: true })
        const { email, password } = this.state;
        fetch('/api/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    isLoading: false,
                    signedIn: true
                })
            } else {
                this.setState({
                    isLoading: false,
                    signedIn: false
                })
                alert('Failed :(')
            }
        })
    }

    signOut(){
        this.setState({ isLoading: true })
        fetch('/api/logout')
            .then(res => {
                this.setState({
                    isLoading: false,
                    signedIn: false
                })
            })
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

  render() {

    const { email, password, isLoading, signedIn } = this.state;

    if(isLoading){
        return (
            <div style={styles.container}>
                <span>Loading...</span>
            </div>
        );
    }

    if(signedIn){
        return (
            <Layout signedIn={signedIn}>
                <div style={styles.container}>
                    <Row vertical='center' justifyContent='center'>
                        <h1 style={styles.signedInTitle}>Woho! You're signed in!</h1> 
                        <Logo />
                    </Row>
                    <Row vertical='center' justifyContent='center'>
                        <Button variant="outline-dark" onClick={() => this.signOut()}>Sign out</Button>
                    </Row>
                </div>
            </Layout>
        );
    }

    return (
        <Layout signedIn={signedIn}>
            <div style={styles.container}>
                <Bat />
                <Row vertical='center' justifyContent='center'>
                    <Column vertical='end'>
                        <h1 style={styles.title}>Sign in</h1>
                        <input style={styles.input} type="text" placeholder='Username or email' value={email} onChange={this.handleEmailChange} />
                        <input style={styles.input} type="password" placeholder='Password' value={password} onChange={this.handlePasswordChange} />
                        <Button variant="outline-dark" onClick={() => this.signIn()}>Sign in</Button>
                    </Column>
                </Row>
            </div>
        </Layout>
    );
  }
}

const styles = {
    container: {
        padding: 20
    },
    title: {
        marginBottom: 20
    },
    signedInTitle: {
        margin: 20
    },
    input: {
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        width: 350,
        marginBottom: 20,
        fontFamily: 'Quicksand'
    }
}
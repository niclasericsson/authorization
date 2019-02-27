import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Column, Row } from 'simple-flexbox';
import Button from 'react-bootstrap/Button';
import { Logo, Kids } from '../components/assets'
import Layout from '../components/Layout.js'
import Loading from '../components/Loading.js'

export default class SignIn extends Component {

	constructor(){
		super();
		this.state = {
            signedIn: false,
            registrationDone: false,
            isLoading: true,
            message: null,
            username: '',
            password: ''
		}
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	componentDidMount() {
        fetch('/api/user')
            .then(res => res.json())
            .then(resJson => {
                if(!resJson.error){
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
            });
    }

    register(){
        const { username, password } = this.state;

        // Only accept letters and numbers for username
        const regex  = /[^a-z\d]/i;
        const accepted = !(regex.test(username));
        if(accepted){
            this.setState({ isLoading: true })
            fetch('/api/register', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                  username: username,
                  password: password
                })
            })
            .then(res => res.json())
            .then(resJson => {
                if(!resJson.error){
                    this.setState({
                        isLoading: false,
                        registrationDone: true
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                    this.setState({ message: resJson.message })
                }
            });
        } else {
            this.setState({ message: 'Only letters and numbers' })
        }
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {

      	const { username, password, isLoading, signedIn, message, registrationDone } = this.state;

        if(isLoading){
            return (
                <Loading />
            );
        }

        if(signedIn){
            return (
                <Layout signedIn={signedIn}>
                    <div style={styles.container}>
                        <Row vertical='center' justifyContent='center'>
                            <h1 style={styles.signedInTitle}>You're already signed in!</h1>
                            <Logo />
                        </Row>
                    </div>
                </Layout>
            );
        }

        return (
            <Layout signedIn={signedIn}>
                <div style={styles.container}>
                    <Kids />
                    <Row vertical='center' justifyContent='center'>
                        {registrationDone ?
                            <Column vertical='end'>
                                <h1 style={styles.title}>Register</h1>
                                <div style={styles.registrationDoneBox}>User registration complete!</div>
                            </Column>
                        :
                            <Column vertical='end'>
                                <h1 style={styles.title}>Register</h1>
                                { message ?
                                    <div style={styles.messageBox}>{message}</div>
                                :
                                    null
                                }
                                <input style={styles.input} type="text" placeholder='Type a username' value={username} onChange={this.handleUserNameChange} />
                                <input style={styles.input} type="password" placeholder='Set a password' value={password} onChange={this.handlePasswordChange} />
                                { username.length == 0 || password.length == 0 ?
                                    <Button disabled variant="outline-dark" onClick={() => this.register()}>Register</Button>
                                    :
                                    <Button variant="outline-dark" onClick={() => this.register()}>Register</Button>
                                }
                                
                            </Column>
                        }

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
    },
    registrationDoneBox: {
        padding: 10,
        width: 350,
        borderRadius: 5,
        border: '1px solid',
        textAlign: 'center'
    },
    messageBox: {
        padding: 10,
        width: 350,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#009999',
        color: '#fff',
        textAlign: 'center'
    }
}
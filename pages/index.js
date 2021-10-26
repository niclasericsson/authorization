import React, { Component } from 'react'
import { Column, Row } from 'simple-flexbox'
import Button from 'react-bootstrap/Button'
import Layout from '../components/Layout.js'
import Loading from '../components/Loading.js'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
            isLoading: true,
            message: null,
            username: '',
            password: '',
        }
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    componentDidMount() {
        fetch('/api/user')
            .then((res) => res.json())
            .then((resJson) => {
                if (!resJson.error) {
                    this.setState({
                        isLoading: false,
                        signedIn: true,
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        signedIn: false,
                    })
                }
            })
    }

    signIn() {
        this.setState({ isLoading: true })
        const { username, password } = this.state
        fetch('/api/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (!resJson.error) {
                    this.setState({
                        isLoading: false,
                        signedIn: true,
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        signedIn: false,
                        message: resJson.message,
                    })
                }
            })
    }

    signOut() {
        this.setState({ isLoading: true })
        fetch('/api/logout').then((res) => {
            this.setState({
                isLoading: false,
                signedIn: false,
            })
        })
    }

    handleUserNameChange(event) {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    render() {
        const { username, password, isLoading, signedIn, message } = this.state

        if (isLoading) {
            return <Loading />
        }

        if (signedIn) {
            return (
                <Layout signedIn={signedIn}>
                    <div style={styles.container}>
                        <Row vertical="center" justifyContent="center">
                            <h1 style={styles.signedInTitle}>
                                Woho! You're signed in!
                            </h1>
                        </Row>
                        <Row vertical="center" justifyContent="center">
                            <Button
                                variant="outline-dark"
                                onClick={() => this.signOut()}
                            >
                                Sign out
                            </Button>
                        </Row>
                    </div>
                </Layout>
            )
        }

        return (
            <Layout signedIn={signedIn}>
                <div style={styles.container}>
                    <Row vertical="center" justifyContent="center">
                        <Column vertical="end">
                            <h1 style={styles.title}>Sign in</h1>
                            {message ? (
                                <div style={styles.messageBox}>{message}</div>
                            ) : null}
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={this.handleUserNameChange}
                            />
                            <input
                                style={styles.input}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={this.handlePasswordChange}
                            />
                            <Button
                                variant="outline-dark"
                                onClick={() => this.signIn()}
                            >
                                Sign in
                            </Button>
                        </Column>
                    </Row>
                </div>
            </Layout>
        )
    }
}

const styles = {
    container: {
        padding: 20,
        marginTop: 50,
    },
    title: {
        marginBottom: 20,
    },
    signedInTitle: {
        margin: 20,
        textAlign: 'center',
    },
    input: {
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        width: 350,
        marginBottom: 20,
        fontFamily: 'Quicksand',
    },
    messageBox: {
        padding: 10,
        width: 350,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#009999',
        color: '#fff',
        textAlign: 'center',
    },
}

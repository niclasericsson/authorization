import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import Logo from '../components/assets'
import Layout from '../components/Layout.js'

export default class SignIn extends Component {

    /*static async getInitialProps(ctx) {
        if (ctx && ctx.req) {
            console.log('server side')
            ctx.res.writeHead(302, {Location: '/'})
            ctx.res.end()
        } else {
            console.log('client side')
            Router.push('/')
        }
    }*/

	constructor(){
		super();
		this.state = {
            signedIn: false,
            isLoading: true,
			message: 'Loading...',
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

     register(){
        this.setState({
            isLoading: true
        })
        const { email, password } = this.state;
        fetch('/api/register', {
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
            if (res.status === 200) {
                this.setState({
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: false
                })
            }
        })
     }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

  render() {

  	const { message, email, password, isLoading, signedIn } = this.state;

    if(isLoading){
        return (
            <div style={styles.container}>
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <Layout signedIn={signedIn}>
            <div style={styles.container}>
                <Logo />
                <span>{message}</span>

                <input type="text" value={email} onChange={this.handleEmailChange} />
                <input type="text" value={password} onChange={this.handlePasswordChange} />

                <button onClick={() => this.register()}>Register</button>

            </div>
            <style jsx global>{`
                body { 
                    margin: 0;
                    font-family: 'PT Sans';
                }
            `}</style>
      </Layout>
    );
  }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    image: {
        
    }
}
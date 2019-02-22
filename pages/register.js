import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import Logo from '../components/assets'

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
			message: 'Loading...',
            email: '',
            password: ''
		}
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	componentDidMount() {
	    /*fetch('/api/getuser')
	      .then(res => res.text())
	      .then(res => this.setState({message: res}));*/

        fetch('/api/verify')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                //this.props.history.push('/signout');
                    console.log('yes')
                } else {
                    console.log('nope')
                }
            })
	 }

     register(){
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
        .then(res => res.text())
        .then(res => this.setState({message: res}));
     }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

  render() {

  	const { message, email, password } = this.state;

    return (
      <div style={styles.container}>
        <Logo />
      	<span>{message}</span>
        <span>{email}</span>
        <span>{password}</span>
        <ul>
          <li><Link href="/signin"><a>Sign In</a></Link></li>
          <li><Link href="/signout"><a>Sign Out</a></Link></li>
        </ul>

        <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
        <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />

        <button onClick={() => this.register()}>Register</button>

        <Link href="/"><a>Back</a></Link>

      </div>
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
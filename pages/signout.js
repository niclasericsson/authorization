import React, { Component } from 'react';
import Link from 'next/link'

export default class SignOut extends Component {

	constructor(){
		super();
		this.state = {
			message: 'Loading...'
		}
	}

	componentDidMount() {
	    //GET message from server using fetch api
	    fetch('/api/signout')
	      .then(res => res.text())
	      .then(res => this.setState({message: res}));
	 }

  render() {

  	const { message } = this.state;

    return (
      <div>
      	<span>{message}</span>
        <ul>
          <li><Link href="/signin"><a>Sign In</a></Link></li>
          <li><Link href="/signout"><a>Sign Out</a></Link></li>
        </ul>
      </div>
    );
  }
}
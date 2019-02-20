import React, { Component } from 'react';
import Link from 'next/link'

export default class Page2 extends Component {

	constructor(){
		super();
		this.state = {
			message: 'Loading...'
		}
	}

	componentDidMount() {
	    //GET message from server using fetch api
	    fetch('/page2')
	      .then(res => res.text())
	      .then(res => this.setState({message: res}));
	 }

	 signIn(){
	 	console.log("test")
	 	fetch('/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: "email=abc&password=123"
        })
        .then((response)=>{
			console.log(response)
        })
	 }

  render() {

  	const { message } = this.state;

    return (
      <div>
      	<span>{message}</span>
        <ul>
          <li><Link href="/page2"><a>Page 2</a></Link></li>
          <li><Link href="/page3"><a>Page 3</a></Link></li>
        </ul>
        <button onClick={() => this.signIn()}>Click me</button>
      </div>
    );
  }
}
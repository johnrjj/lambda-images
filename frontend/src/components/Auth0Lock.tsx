import Auth0Lock from 'auth0-lock';
import * as React from 'react';
import { Component } from 'react';

export interface AuthProps {
  clientId: string;
  domain: string;
}

class Auth extends Component<AuthProps, null> {
  _lock;

  constructor(props) {
    super(props);
    this._lock = new Auth0Lock(props.clientId, props.domain)
  }

  _showLogin = () => {
    this._lock.show();
  }

  componentDidMount() {
    this._lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      // this.props.router.replace(`/login`)
    })
  }

  render() {
    return (
      <div onClick={this._showLogin}>
        {this.props.children}
      </div>
    )
  }
};


// auth request...
  // const token = localStorage.getItem('userToken');
  // if (!token) {
  //   document.getElementById('message').textContent = '';
  //   document.getElementById('message').textContent = 'You must login to call this protected endpoint!';
  //   return false;
  // }
  // const getdata = fetch(PRIVATE_ENDPOINT, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   method: 'GET',
  //   cache: 'no-store',
  // });

export default Auth;
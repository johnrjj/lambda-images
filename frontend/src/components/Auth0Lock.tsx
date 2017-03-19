import Auth0Lock from 'auth0-lock';
import * as React from 'react';
import { Component } from 'react';

export interface AuthProps {
  clientId: string;
  domain: string;
  // router: any;
}

class Auth extends Component<AuthProps, null> {
  _lock;

  constructor(props) {
    super(props);
    this._lock = new Auth0Lock(props.clientId, props.domain)
  }

  _showLogin = () => {
    this._lock.show()
  }

  componentDidMount() {
    this._lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      // this.props.router.replace(`/login`)
    })
  }

  render() {
    return (
      <div>
        <span
          onClick={this._showLogin}
          className='dib pa3 white bg-blue dim pointer'
        >
          Log in with Auth0
      </span>
      </div>
    )
  }
};

export default Auth;
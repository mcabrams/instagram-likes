import * as React from 'react';
import { connect } from 'react-redux';

import { fetchInstagramLoginState } from '../ducks/instagramAuth/actions';
import { RootState } from '../index';

export interface InstagramLoginProps {
  loggedIn: boolean;
  requestingLogin: boolean;
}

class InstagramLogin extends React.Component<InstagramLoginProps> {
  componentDidMount() {
    this.props.dispatch(fetchInstagramLoginState());
  }

  render() {
    if (this.props.loggedIn) {
      return <p>Logged In</p>;
    }

    if (this.props.requestingLogin) {
      return <p>Logging In...</p>;
    }

    return (
      <a href="/login">Login to Instagram</a>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.main.instagramAuth.loggedIn,
    requestingLogin: state.main.instagramAuth.requestingLogin,
  };
};

const LoginContainer = connect(mapStateToProps)(InstagramLogin);

export default LoginContainer;

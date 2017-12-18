import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'reactbulma';

import './LoginContainer.css';

import { fetchInstagramLoginState } from '../ducks/instagramAuth/actions';
import { Dispatch, RootState } from '../index';

export interface InstagramLoginProps {
  loggedInAs: string | null;
  requestingLogin: boolean;
  fetchLoginState: () => any;
}

class InstagramLogin extends React.Component<InstagramLoginProps> {
  componentDidMount() {
    this.props.fetchLoginState();
  }

  render() {
    if (this.props.loggedInAs) {
      return <p>Logged in as {this.props.loggedInAs}</p>;
    }

    if (this.props.requestingLogin) {
      return <p>Logging In...</p>;
    }

    return (
      <Button as="a" href="/login" large={true} primary={true}>
        <Icon className="instagram-icon">
          <i className="fa fa-instagram"/>
        </Icon>
        Login to Instagram to find out!
      </Button>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loggedInAs: state.main.instagramAuth.loggedInAs,
    requestingLogin: state.main.instagramAuth.requestingLogin,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchLoginState: () => dispatch(fetchInstagramLoginState()),
  };
};

const LoginContainer = connect(
  mapStateToProps, mapDispatchToProps)(InstagramLogin);

export default LoginContainer;

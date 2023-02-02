import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import { connect } from 'react-redux';
import { Play, Gear } from 'phosphor-react';
import { actionGetPlayerData } from '../redux/actions';
import { getApiToken, getQuestions } from '../redux/actions/trivia';

import logo from '../trivia.png';

// Estilo
import '../styles/login.css';

import Loading from '../components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disableBtn: true,
      login: false,
    };
  }

  inputValidation = () => {
    const { name, email } = this.state;

    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // fonte regex https://regexr.com/3e48o
    const emailTest = regex.test(email);
    const nameTest = name.length;

    this.setState({
      disableBtn: !(emailTest && nameTest),
    });
  }

  loadingBtn = (status) => {
    this.setState({
      login: status,
    });
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.inputValidation());
  }

  loadingPlayerData = () => {
    const { savePlayerData } = this.props;
    const { name, email } = this.state;

    const emailHash = md5(email).toString();
    savePlayerData(name, emailHash);
  }

  playBtn = async () => {
    const {
      getNewToken, savedToken, quantity, saveQuestions, history,
    } = this.props;

    this.loadingBtn(true);
    await saveQuestions(savedToken || await getNewToken(), quantity);
    this.loadingPlayerData();
    this.loadingBtn(false);
    history.push('/gameboard');
  }

  settingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, disableBtn, login } = this.state;
    return (
      <div className="login-container">
        <img src={ logo } className="App-logo" alt="logo" />
        <div className="login-forms">
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            value={ name }
            placeholder="Insert Player Name"
            onChange={ this.inputHandler }
          />
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            placeholder="Insert Player E-mail"
            onChange={ this.inputHandler }
          />
          <div className="login-buttons">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disableBtn }
              onClick={ this.playBtn }
            >
              { !login ? <Play size={ 20 } weight="fill" /> : <Loading />}
              {/* <Play size={ 20 } weight="fill" /> */}
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.settingsBtn }
            >
              <Gear size={ 20 } weight="fill" />
            </button>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  savedToken: state.token,
  quantity: state.settings.quantity,
  questions: state.questions.questionsData,
});

const mapDispatchToProps = (dispatch) => ({
  getNewToken: () => dispatch(getApiToken()),
  savePlayerData: (playerName, hash) => dispatch(actionGetPlayerData(playerName, hash)),
  saveQuestions: (token, quantity) => dispatch(getQuestions(token, quantity)),
});

Login.propTypes = {
  tokenRequest: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  savePlayerData: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);

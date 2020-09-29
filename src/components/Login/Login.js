import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import empty from 'is-empty';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from 'react-google-login';

import {get_role_img} from '../../utils/images';

import {Grid, TextField, Button, Divider} from '@material-ui/core';

class Login extends Component {
	constructor(props) {
		super(props);
    this.state = {
      data: {
        email: '',
        password: ''
      },
      captcha: false
    }
	}

  handleDataChange = e => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
  	const {small, xs, theme, dark, role} = this.props;
    const {data, captcha} = this.state;

    const emptyCheck = !empty(data.email) && !empty(data.password) && captcha;

  	return(
  		<Grid xs={12} container item style={{borderRadius: 6, border: `1px solid ${theme.primary.main}`, padding: (dark && small) ? "0" : "1.5rem"}}>
  			{!small && (<Grid sm={0} md={6} container item style={{paddingRight: small ? "" : "1.5rem"}}>
          <img src={get_role_img(role)} alt="" style={{width: "100%", objectFit: "cover", height: "100%", borderRadius: 6}}/>
        </Grid>)}
        <Grid sm={12} md={6} container item direction="column" style={{background: "#fff", padding: dark ? "1rem" : "", borderRadius: 6}}>
          <span style={{color: !dark ? theme.primary.main : theme.primary.contrastText, fontSize: "2rem", lineHeight: "1.6rem", marginBottom: "1rem", fontWeight: 500}}>{role.toUpperCase()} LOGIN</span>
          <TextField
            size="small"
            variant="outlined"
            value={data.email}
            name="email"
            onChange={this.handleDataChange}
            color="primary"
            inputProps={{
              placeholder: "Email"
            }}
            style={{marginBottom: "0.5rem"}}
            fullWidth
          />
          <TextField
            size="small"
            variant="outlined"
            value={data.password}
            name="password"
            type="password"
            color="primary"
            onChange={this.handleDataChange}
            inputProps={{
              placeholder: "Password"
            }}
            style={{marginBottom: "0.5rem"}}
            fullWidth
          />
          <Link to="/forgot" style={{marginBottom: "0.5rem", color: !dark ? theme.primary.main : theme.primary.contrastText, fontSize: "0.9rem"}}>Forgot Password?</Link>
          <ReCAPTCHA
            sitekey="6LdAldEZAAAAANrCrYaxC6PpkQBYcmOASFJjXht1"
            onChange={value => this.setState({...this.state, captcha: !empty(value)})}
            style={{marginBottom: "0.5rem"}}
          />
          <Button variant="contained" fullWidth style={{backgroundColor: !emptyCheck ? "" : "#002868", color: !emptyCheck ? "" : "white", marginBottom: "1rem"}} size="large" disabled={emptyCheck}>Login</Button>
          <GoogleLogin
            clientId="669027125073-9hm16et2k1jq5jgockuo1h88ff1sjc47.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.onGoogleSuccess}
            onFailure={this.onGoogleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <div style={{height: "1rem"}}/>
          <div style={{display: "flex", alignItems: "center", marginBottom: "1rem", width: "100%"}}>
            <Divider style={{flex: 1, marginRight: "1rem"}}/>
            <span style={{fontSize: "0.9rem", color: "#002868"}}>or</span>
            <Divider style={{flex: 1, marginLeft: "1rem"}}/>
          </div>
          <Link to={`/register/${role}`} style={{width: "100%"}}><Button variant="contained" fullWidth style={{backgroundColor: "#002868", color: "white"}} size="large">Register</Button></Link>
        </Grid>
  		</Grid>
  	);
  }
}

const mapStateToProps = state => ({
  dark: state.dark
});
 
export default connect(mapStateToProps,{})(Login);

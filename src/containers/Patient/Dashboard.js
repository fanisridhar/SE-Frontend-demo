import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import {TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment} from '@material-ui/core';

import Loading from '../../components/Graphics/Loading';
import Onboarding from './Onboarding';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  componentDidMount() {
    if(!empty(this.props.user.detail)) {
      this.props.history.push('/patient/appointments');
    }
  }

  render() {
    const {maxWidth, small, xs, theme, dark, user} = this.props;
    const {loaded} = this.state;
    
    return (
      <Fragment>
        {!loaded && (<Loading />)}
        {empty(user.detail) && (<Onboarding {...this.props}/>)}
        <Grid item container xs={12} direction="row" justify="center" style={{backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)"}}>
          <Grid item container direction="column" style={{width: maxWidth, padding: small ? "2rem 1rem" : "3rem 0", height: "100%", position: "relative"}}>
            <span>Patient Dashboard</span>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  dark: state.dark,
  user: state.user
});

export default connect(mapStateToProps,{})(withRouter(withToast(Dashboard)));

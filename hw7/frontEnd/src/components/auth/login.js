import React from 'react'
import { connect } from 'react-redux'

import { login } from './authActions'

const Login = ({dispatch}) => {
    let username, password
    return (
            <div className="col-xs-4 col-md-offset-2">
              <div class="well">
                <h2>Login here</h2>
                <div className="form-group row">
                    <label className="col-sm-8 form-control-label" for="loginUsername">username</label>
                    <div className="col-sm-9">
                    <input className="form-control" id="loginUsername" type="text" placeholder="username"
                        ref={(node) => { username = node }} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-8 form-control-label" for="loginPassword">password</label>
                    <div className="col-sm-9">
                    <input className="form-control" id="loginPassword" type="password" placeholder="password"
                        ref={(node) => { password = node }} />
                    </div>
                </div>

                <div className="form-group row">
                    <span className="col-sm-8 form-control-label"></span>
                    <div className="col-sm-9">
                    <input className="btn btn-primary" type="button" value="Login" id="loginButton"
                        onClick={() => { dispatch(login(username.value, password.value)) }}/>
                    </div>
                </div>
            </div>
          </div>
    )
}

export default connect()(Login)

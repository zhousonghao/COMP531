import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateHeadline } from '../profile/profileActions'

class Headline extends Component {

    render() { return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="text-center">
                        <h4 id="username">{ this.props.username }</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <img width="100%" src={ this.props.avatar }/>
                </div>
                <div className="col-sm-2"></div>
            </div>

            <div className="row">
                <div className="col-sm-8 col-md-offset-2">
                    <div className="text-center">
                        <h4 id="headlineText">{ this.props.headline }</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-8 col-md-offset-2">
                    <input className="form-control" id="headlineInput" type="text"
                        placeholder="update your headline"
                        ref={ (node) => { this.newHeadline = node }}
                        onChange={() => this.forceUpdate()} />
                </div>

            { !(this.newHeadline && this.newHeadline.value.length > 0) ? '' :
                <div className="col-sm-8 col-md-offset-2">
                    <input className="btn btn-primary" id="headlineBtn"
                        type="button" value="Update your Headline"
                        onClick={() => {
                            this.props.dispatch(updateHeadline(this.newHeadline.value))
                            this.newHeadline.value = ''
                        }}/>
                </div>
            }
            </div>
        </div>
    )}
}
export default connect(
    (state) => {
        return {
            username: state.profile.username,
            headline: state.profile.headline,
            avatar: state.profile.avatar
        }
    }
)(Headline)

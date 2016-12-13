import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower, dispatch } from './followingActions'

const Follower = ({name, avatar, headline, dispatch}) => (
    <div className="row followers" name="follower">
        <div>&nbsp;</div>
        <div className="media-left">
            <img className="followingImage" src={ avatar }/>
        </div>
        <div className="media-body">
            <div><strong>{ name }</strong></div>
            <div><em>{ headline }</em></div>
        </div>
        <div className="media-right">
            <span className="glyphicon glyphicon-remove" id="unfollowBtn" onClick={() => { dispatch(delFollower(name)) }}></span>
        </div>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
    dispatch: PropTypes.func.isRequired
}

class Following extends Component {
    render() { return (
        <div>
            <div className="col-sm-2">&nbsp;</div>
            <div className="col-sm-2">
                { Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                    <Follower key={follower.name}
                        name={follower.name} avatar={follower.avatar} headline={follower.headline}
                        dispatch={this.props.dispatch} />
                )}
                <div className="row">&nbsp;</div>
                <div className="row">
                    <input className="form-control" type="text" id="addFollowerText"
                        placeholder="add follower"
                        ref={(node) => this.newFollower = node }
                        onChange={(e) => {
                            this.forceUpdate()
                        }}/>
                { !(this.newFollower && this.newFollower.value && this.newFollower.value.length > 0) ? '' :
                    <input className="btn btn-primary" type="button" id="addFollowerBtn"
                        onClick={() => {
                            this.props.dispatch(addFollower(this.newFollower.value))
                            this.newFollower.value = ''
                            this.forceUpdate()
                        }}
                        value="add follower"/>
                }
                { this.props.error.length == 0 ? '' :
                    <div className="alert alert-danger">
                        { this.props.error }
                    </div>
                }
                </div>
            </div>
            <div className="col-sm-2">&nbsp;</div>
        </div>
    )}
}

Following.propTypes = {
    error: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            followers: state.followers.followers
        }
    }
)(Following)

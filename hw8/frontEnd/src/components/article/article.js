import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Comment from './comment'
import ContentEditable from './contentEditable'
import { editArticle } from './articleActions'

class Article extends Component {

  constructor(props) {
    super(props)
    this.hideComments = true
    this.disabled = true
    this.addComment = false
    this.newComment = ''
  }

  render() {
    const date = moment(new Date(this.props.date))
    return (
    <div className="row article" name="article">
      <div className="col-sm-11">
        <h3>
          <img className="followingImage" src={ this.props.avatar }/>
          <span id="authorName">{this.props.author}</span> said
          on {date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}
        </h3>

        <div className="row article-text">
          <div className="col-sm-11">
            <div className="media-left">
              <img className="postImage" src={this.props.img}/>
            </div>
            <ContentEditable className="media-body article-text" html={this.props.text}
              contentEditable={this.props.username == this.props.author}
              tooltip={this.props.username == this.props.author ? 'click to edit' : ''}
              onChange={(e) => {
                this.newMessage = e.target.value
                this.disabled = this.props.text == this.newMessage
                this.forceUpdate()
              }}/>
          </div>
        </div>

        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <label className="btn btn-warning"
              onClick={() => {
                this.hideComments = !this.hideComments
                this.forceUpdate()
              }}>
              { this.hideComments ? 'Show' : 'Hide' } Comments ({ this.props.comments.length })
            </label>
          </div>

          <div className="btn-group">
            <label className="btn btn-success"
              onClick={() => { this.addComment = !this.addComment; this.forceUpdate() }}>
              { this.addComment ? 'Cancel' : 'Add comment' }
            </label>
          </div>

        { this.props.author != this.props.username ? '' :
          <div className="btn-group">
            <label className="btn btn-primary" id="editPostBtn"
              title="Click to edit your post"
              disabled={this.disabled}
              onClick={() => {
                this.props.dispatch(editArticle(this.props._id, this.newMessage))
                this.disabled = true
                this.forceUpdate()
              }}>
              Edit post
            </label>
          </div>
        }
        </div>

        <div className="btn-group btn-group-justified">
          <div className="btn-group"></div>
        { !this.addComment ? '' :
          <div className="btn-group">
            <div>
              <textarea className="newPostText"
                cols="80" rows="4" placeholder="your comment"
                value={this.newComment}
                onChange={(e) => {
                  this.newComment = e.target.value
                  this.forceUpdate()
              }}>
              </textarea>
              <label className="btn btn-success"
                disabled={ this.newComment.length == 0 }
                onClick={() => {
                  if (this.newComment.length > 0)
                    this.props.dispatch(editArticle(this.props._id, this.newComment, -1))
                    this.newComment = ''
                    this.addComment = false
                    this.forceUpdate()
                }}>
                Make a comment
              </label>
            </div>
          </div>
        }
          <div className="btn-group"></div>
        </div>

        { this.hideComments ? '' : this.props.comments.sort((a,b) => {
          if (a.date < b.date)
            return 1
          if (a.date > b.date)
            return -1
          return 0
        }).map((comment) =>
            <Comment key={comment.commentId} articleId={this.props._id} username={this.props.username}
              commentId={comment.commentId} author={comment.author} date={comment.date}
              text={comment.text} avatar={comment.avatar} />
        )}
      </div>
    </div>
  )}
}

Article.propTypes = {
  _id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    ...Comment.propTypes
  }).isRequired).isRequired
}

export default connect()(Article)

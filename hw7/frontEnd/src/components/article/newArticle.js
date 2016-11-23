import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadArticle } from './articleActions'

class NewArticle extends Component {

    handleImageChange(e) {
        e.preventDefault()

        let reader = new window.FileReader();
        reader.onloadend = () => {
            this.preview = reader.result
            this.forceUpdate();
        }

        this.file = e.target.files[0];
        if (typeof(this.file) == 'Blob')
            reader.readAsDataURL(this.file)
    }

    render() { return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                <br/>
                    <textarea class="newPostBody" id="postTextArea"
                      cols="80" rows="4" placeholder="what's on your mind"
                      value={ this.message }
                      onChange={(e) => {
                        this.message = e.target.value
                        this.forceUpdate();
                    }}>
                    </textarea>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-5">
                    <input type="file" id="articleImage" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>
                </div>
            { !this.file && !this.message ? '' :
                <div className="col-sm-2">
                    <div className="text-right">
                        <input className="btn btn-primary" type="button" value="Post" id = "postBtn"
                            onClick={() => {
                                this.props.dispatch(uploadArticle(this.message, this.file))
                                this.message = ''
                                this.file = undefined
                                this.forceUpdate()
                            }}/>
                    </div>
                </div>
            }
            </div>

        { !this.file ? '' :
            <div className="row">
                <img className="postImage" src={this.preview}/>
                <div>
                { this.file.webkitRelativePath || this.file.name }<br/>
                ({ parseInt(this.file.size / 1024 * 100)/100.0 } kB)
                </div>
            </div>
        }
        </div>
    )}
}

export default connect()(NewArticle)

import React from 'react'

import Headline from './headline'
import Following from './following'
import ArticlesView from '../article/articlesView'

const Main = () => (

    <div className="row">
        <div className="col-sm-8">
            <Headline/>
            <Following/>
        </div>
        <ArticlesView/>
    </div>
)

export default Main

import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

const isLocal = false;
export const apiUrl = isLocal ? 'http://localhost:3000' : 'https://sz40ricebook.herokuapp.com'

const Action = {

     ADD_ARTICLE: 'ADD_ARTICLE'
    ,UPDATE_ARTICLES: 'UPDATE_ARTICLES'
    ,EDIT_ARTICLE: 'EDIT_ARTICLE'
    ,SEARCH_KEYWORD: 'SEARCH_KEYWORD'
    ,UPDATE_AVATARS: 'UPDATE_AVATARS'
    ,UPDATE_HEADLINE: 'UPDATE_HEADLINE'
    ,UPDATE_PROFILE: 'UPDATE_PROFILE'
    ,FOLLOWER_UPDATE: 'FOLLOWER_UPDATE'
    ,ERROR: 'ERROR'
    ,SUCCESS: 'SUCCESS'
    ,NAV2PROFILE: 'NAV2PROFILE'
    ,NAV2MAIN: 'NAV2MAIN'
    ,NAV2OUT: 'NAV2OUT'
    ,LOGIN_LOCAL: 'LOGIN_LOCAL'

}

export default Action

export function updateError(error) { return { type: Action.ERROR, error }}
export function updateSuccess(success) { return { type: Action.SUCCESS, success }}
export function nav2Profile() { return { type: Action.NAV2PROFILE }}
export function nav2Main() { return { type: Action.NAV2MAIN }}
export function nav2Out() { return { type: Action.NAV2OUT }}

export function resource(method, endpoint, payload, submitJson = true) {
    const options = {credentials: 'include', method}
    if (submitJson) options.headers = {'Content-Type': 'application/json'}
    if (payload) {
        options.body = submitJson ? JSON.stringify(payload) : payload
    }

    return fetch(`${apiUrl}/${endpoint}`, options)
    .then((response) => {
        if (response.status == 401) {
            const message = `Error in ${method} ${endpoint} ${JSON.stringify(response.json())}`
            throw new Error(message)
        } else {
            return response.json()
        }
    })
}

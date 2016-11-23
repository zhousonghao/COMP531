import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Ricebook Login Page', () => {

    before('come to the landing page', (done) => {
        go().then(done)
    })

    it('Register a new user', (done) => {
        sleep(500)
        .then(findId('username').clear())
        .then(findId('username').sendKeys('szsz'))
        .then(findId('email').clear())
        .then(findId('email').sendKeys('sz@rice.edu'))
        .then(findId('zipcode').sendKeys('77005'))
        .then(findId('password').clear())
        .then(findId('password').sendKeys('whatever'))
        .then(findId('pwconf').clear())
        .then(findId('pwconf').sendKeys('whatever'))
        .then(findId('submitButton').click())
        .then(sleep(2000))
        .then(findId('successMessage').getText().then(text=>{
            expect(text).to.eql("Success! You can now log in as \"szsz\".")
        }))
        .then(done)
    })

    it("Log in as test user", (done)=>{
        sleep(500)
        .then(common.login)
        .then(done);
    })

})

import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test profile Page', () => {

    before('should navigate to profile page', (done) => {
        sleep(500)
        .then(findId('navToProfile').click())
        .then(sleep(1000))
        .then(done)
    })

    it("Update user email and verify", (done)=>{
        const newEmail = 'sz18@rice.edu'
        sleep(500)
        .then(findId('email').clear())
        .then(findId('email').sendKeys(newEmail))
        .then(findId('updateBtn').click())
        .then(sleep(2000))
        .then(findId('email').getAttribute("placeholder").then(text=>{
            expect(text).to.eql(newEmail)
        }))
        .then(done)
    })

    it("Update user zipcode and verify", (done)=>{
        const newZipcode = '77777'
        sleep(500)
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(newZipcode))
        .then(findId('updateBtn').click())
        .then(sleep(2000))
        .then(findId('zipcode').getAttribute("placeholder").then(text=>{
            expect(text).to.eql(newZipcode)
        }))
        .then(done)
    })

    it("Update user password and verify", (done)=>{
    	const password = 'uiuiuiu'
        sleep(500)
        .then(findId('password').clear())
        .then(findId('password').sendKeys(password))
        .then(findId('pwconf').clear())
        .then(findId('pwconf').sendKeys(password))
        .then(findId('updateBtn').click())
        .then(sleep(2000))
        .then(findId('errorMessage').getText().then(text=>{
            expect(text).to.eql('we cannot change the password right now')
        }))
    	.then(done)
    })
})

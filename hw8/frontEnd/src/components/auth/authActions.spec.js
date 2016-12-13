import { login, logout } from './authActions'
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'


describe('Validate Authentication (involves mocked requests)', () => {

	let resource, url, Action, loginAction, logoutAction

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		Action = require('../../actions').default
		  resource = require('../../actions').resource
  		url = require('../../actions').url
  		loginAction = require('./authActions').login
  		logoutAction = require('./authActions').logout
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})


	it('should not log in an invalid user', (done)=> {
		const username = 'sz40'
		const password = 'kkk'
		loginAction(username,password)((action) => {
			try{
				expect(action.type).to.eql(Action.ERROR);
				done();
			} catch(e){
				done(e);
			}
		})
	})


	it('should log in a user', (done) => {
		const username = 'sz40'
		const password = 'kkkk'
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json:{username, result:'success'}
		})

		let count = 0;
		login(username,password)((action) => {
			try {
				if(action.type===Action.LOGIN) {
					expect(action.username).to.eql(username);
				}
				count++;
			} catch (e) {
				done(e)
			}
		})
		done()
	})


	it('should log out a user (state should be cleared)', (done)=> {
		mock(`${url}/logout`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			json: {text:'OK'}
		})

		logoutAction()((action) => {
			try{
				if(action.type===Action.LOGOUT) {
					expect(action).to.eql({type:Action.LOGOUT});
				}
				else if(action.type===Action.NAV2INDEX){
					expect(action).to.eql({type:Action.NAV2INDEX});
				}
			}catch(e){
				done(e)
			}
		})
		done()
	})
})

import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Action, {url, updateError, updateSuccess, nav2Profile, nav2Main, nav2Out, resource} from './actions'


describe('Validate actions (these are functions that dispatch actions)', () => {

	let Action, actions
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
		Action = require('./actions').default
		actions = require('./actions')
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it('- resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${url}/sample`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			json:{articles:[{id:1, author:'sz40',text:'hello'}]}
		})

		resource('GET', 'sample').then((response) => {
			expect(response.articles).to.exist;
		})
		.then(done).catch(done)
  })


	it('should update error message (for displaying error mesage to user)', ()=>{
		const msg = 'test error message';
		const expectAction = {
			type: Action.ERROR,
			error: msg
		}
		expect(updateError(msg)).to.eql(expectAction);
	})

	it('should update success message (for displaying success message to user)', ()=>{
		const msg = 'test success message';
		const expectAction = {
			type: Action.SUCCESS,
			success: msg
		}
		expect(updateSuccess(msg)).to.eql(expectAction);
	})

	it('should navigate (to profile, main, or landing)', ()=>{
		expect(nav2Out()).to.eql({type: Action.NAV2OUT});
		expect(nav2Main()).to.eql({type: Action.NAV2MAIN});
		expect(nav2Profile()).to.eql({type: Action.NAV2PROFILE});
	})
})

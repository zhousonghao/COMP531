/*
 * Test suite for profile.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Profile functionality', () => {

	it('PUT headline updates the headline message', (done) => {
		let oldHeadline, newHeadline
    	//Get the headline
		fetch(url("/headlines"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.headlines[0].headline).to.exist
			oldHeadline = body.headlines[0].headline
    		//Put a new headline
		 	return fetch(url("/headline"), {
				method: 'PUT',
        		headers: {'Content-Type': 'application/json'},
        		body: JSON.stringify({headline: 'This is my new headline! Not ' + oldHeadline})
    		})
		})			
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.headline).to.eql('This is my new headline! Not ' + oldHeadline)
			return fetch(url("/headlines"))
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body =>{
			expect(body.headlines[0].headline).to.exist
			newHeadline = body.headlines[0].headline
			expect(newHeadline).to.not.eql(oldHeadline)
		})
		.then(done)
		.catch(done)
 	}, 200)

});

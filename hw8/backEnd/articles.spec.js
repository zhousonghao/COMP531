/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('verify adding an article should increase the number of articles', (done) => {
		let oldCount, newCount
    	//Get the articles
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.articles).to.exist
			oldCount = body.articles.length
    		//Put a new article
		 	return fetch(url("/article"), {
				method: 'POST',
        		headers: {'Content-Type': 'application/json'},
        		body: JSON.stringify({text: 'This is my new post article!'})
    		})
		})			
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.articles[0]).to.exist
			expect(body.articles[0].text).to.eql('This is my new post article!')
			return fetch(url("/articles"))
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body =>{
			expect(body.articles).to.exist
			newCount = body.articles.length
			expect(newCount).to.eql(oldCount + 1)
		})
		.then(done)
		.catch(done)
 	}, 200)

});

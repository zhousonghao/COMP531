import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Action from './actions'
import Reducer, {common, articles, profile} from './reducers'


describe('Validate reducer (no fetch requests here)', () => {

	it('should initialize state', ()=>{
		expect(Reducer(undefined, {})).to.eql({
			common:{location:'', error:'', success:''},
			articles:{articles:{}, searchKeyword:'', avatars:{}},
			profile:{ username:'', headline:'', avatar:'', zipcode:'', dob:'', email:''},
			followers:{followers: {}}
		})
	})

	it('should state success (for displaying success message to user)', () => {
		expect(common(undefined,
		{
			type:Action.SUCCESS,
		 	success:'success test'}))
		.to.eql(
		{
			location:'',
			success:'success test',
			error:''
		})
	})

	it('should state error (for displaying error message to user)', () => {
		expect(common(undefined,
		{
			type:Action.ERROR,
			error:'error test'}))
		.to.eql(
		{
			location:'',
			success:'',
			error:'error test'
		})
	})

	it('should set the articles',() => {
		expect(articles(undefined,
		{
			type:Action.UPDATE_ARTICLES,
			articles:{_id:1, text:'Text A', author:'sz40'}
		}))
		.to.eql(
		{
			searchKeyword:'',
			avatars:{},
			articles:{_id:1, text:'Text A', author:'sz40'}
		})
	})


	it('should set the search keyword',() => {
		expect(articles(undefined,
		{
			type:Action.SEARCH_KEYWORD,
			keyword:'keyword1'
		}))
		.to.eql(
		{
			searchKeyword:'keyword1',
			avatars:{},
			articles:{}
		})
	})



})

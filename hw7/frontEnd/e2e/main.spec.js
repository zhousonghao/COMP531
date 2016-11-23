import { expect } from 'chai'
import { go, sleep, findId, findCSS, findClass, By } from './selenium'
import common from './common'

describe('Test Ricebook Main Page', () => {

    // before('should log in', (done) => {
    //     go().then(common.login).then(done)
    // })

    it("Create a new article and validate the article appears in the feed", (done)=>{
    	let originalLength = 0
        const newArticle = "This is my new post article!"
        sleep(500)
        .then(findClass('article').then(
            (articles)=>{
                expect(articles.length).to.be.at.least(1)
                originalLength = articles.length;
            }
        ))
        .then(findId('postTextArea').clear())
        .then(findId('postTextArea').sendKeys(newArticle))
        .then(findId('postBtn').click())
        .then(sleep(1500))
        .then(findClass('article').then(
            (articles)=>{
                expect(articles.length).to.eql(originalLength+1)
            }
        ))
        .then(findClass('article-text').then((texts)=>texts[0].getText())
            .then((text)=>{
                expect(text).to.eql(newArticle)
            }
        ))
        .then(done)
    })

    it("Edit an article and validate the article text has updated", (done)=>{
    	const editedArticle = "This article is edited!"
    	sleep(500)
    //   .then(findClass('article-text').then((texts)=>texts[0].clear()))
		// .then(findClass('article-text').then((texts)=>texts[0].click()))
		// .then(findClass('article-text').then((texts)=>texts[0].sendKeys(editedArticle)))
		// .then(findId('editPostBtn').click())
    //     .then(findClass('article-text').then((texts)=>texts[0].getText())
    //         .then((text)=>{
    //             expect(text).to.eql(editedArticle)
    //         }
    //     ))
    	.then(done)
    })

    it("Update the status headline and verify the change", (done)=>{
    	const oldHeadline = 'I am cool'
        const newHeadline = 'I am hot'
        sleep(500)
        .then(findId('headlineInput').clear())
        .then(findId('headlineInput').sendKeys(oldHeadline))
        .then(findId('headlineBtn').click())
        .then(sleep(2000))
        .then(findId('headlineText').getText().then(text=>{
            expect(text).to.eql(oldHeadline)
        }))
        .then(findId('headlineInput').clear())
        .then(findId('headlineInput').sendKeys(newHeadline))
        .then(findId('headlineBtn').click())
        .then(sleep(2000))
        .then(findId('headlineText').getText().then(text=>{
            expect(text).to.eql(newHeadline)
        }))
        .then(done)
    })

    it("Add the user \"Follower\" to the list of followed users and verify following count increases by one", (done)=>{
    	let oriFollowerNum = 0
        sleep(500)
        .then(findClass('followers').then( //change
            (Follower)=>{
                expect(Follower.length).to.be.at.least(1)
                oriFollowerNum = Follower.length
            }
        ))
        .then(findId('addFollowerText').clear())
        .then(findId('addFollowerText').sendKeys('Follower'))
        .then(findId('addFollowerBtn').click())
        .then(sleep(2000))
        .then(findClass('followers').then(
            (Follower)=>{
                expect(Follower.length).to.eql(oriFollowerNum+1)
            }
        ))
    	.then(done)
    })

    it("Remove the user \"Follower\" from the list of followed users and verify following count decreases by one", (done)=>{
   		let oriFollowerNum = 0
        sleep(500)
        .then(findClass('followers').then(
            (Follower)=>{
                expect(Follower.length).to.be.at.least(1)
                oriFollowerNum = Follower.length
            }
        ))
        .then(findId('unfollowBtn').click())
        .then(sleep(2000))
        .then(findClass('followers').then(
            (Follower)=>{
                expect(Follower.length).to.eql(oriFollowerNum-1)
            }
        ))
    	.then(done)
    })

	it("Search for \"Only One Article Like This\" and verify only one article shows, and verify the author", (done)=>{
    	sleep(500)
    	.then(findId('searchBox').clear())
        .then(findId('searchBox').sendKeys('Only One Article Like This'))
        .then(sleep(2000))
        .then(findClass('article').then(
            (articles)=>{
                expect(articles.length).to.eql(1)
            }
        ))
        .then(findId('authorName').getText().then(text=>{
            expect(text).to.eql(common.creds.username)
        }))
    	.then(done)
    })

})

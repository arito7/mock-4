// 1. Design a simplified version of Twitter where users can post tweets, follow and unfollow another users,
// 2. and is able to see the 10 most recent tweets in a user's news feed.
class Twitter {
    // userId: [tweets]
    constructor() {
        this.tweetMap = new Map();
        this.followMap = new Map(); //  userId: Set[]
        this.count = 0;
    }

    tweet(userId) {
        if (this.tweetMap.has(userId)) {
            this.tweetMap.get(userId).push(this.count)
        } else {
            this.tweetMap.set(userId, [this.count])
        }
        this.count++
    }

    follow(userId, followerId) {
        if (this.followMap.has(userId)) {
            this.followMap.get(userId).add(followerId)
        } else {
            this.followMap.set(userId, new Set([followerId]))
        }
    }

    unfollow(userId, followerId) {
        if (this.followMap.has(userId)) {
            this.followMap.get(userId).delete(followerId)
        }
    }

    getRecentTweet(userId) {
        const friends = this.followMap.get(userId)// set of all friends
        const mostRecentTweets = [-1] // minHeap

        for (const friend of friends) {
            var tweets = this.tweetMap.get(friend) // tweets of specific friend
            for (let i = tweets.length - 1; i >= 0; i--) {
                if (tweet > mostRecentTweets[0]) {
                    mostRecentTweets.push(tweet)
                    if (mostRecentTweets.length > 10) {
                        mostRecentTweets.pop()
                    }
                } else {
                    break;
                }
            }
        }
        return mostRecentTweets
    }
}
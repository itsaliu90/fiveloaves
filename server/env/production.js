/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "TWITTER": {
        "consumerKey": "tpyipc7QPzArOxWfhcrDrSxR5",
        "consumerSecret": "tSuegleg1rRC6jDjVk8ermvZheHskJhpXLMCXNMry5UUlOlfvs",
        "access_token_key": '3410409694-slrWj6vVGfUXF86iPJX8JJ1QyGxnyix4JaW8VxU',
        "access_token_secret": '8qPJwr9UdItizLx7HyYvKoIRhtmJ8JoKDMgX4odV1ZROb',
        "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE"
      },
    "FACEBOOK": {
        "clientID": process.env.FACEBOOK_APP_ID,
        "clientSecret": process.env.FACEBOOK_CLIENT_SECRET,
        "callbackURL": process.env.FACEBOOK_CALLBACK_URL
    },
    "GOOGLE": {
        "clientID": process.env.GOOGLE_CLIENT_ID,
        "clientSecret": process.env.GOOGLE_CLIENT_SECRET,
        "callbackURL": process.env.CALLBACK_URL
    }
};
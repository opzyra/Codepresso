const app = require('./app')
const models = require('./models')

const Account = require('./models/account')
const Topic = require('./models/topic')
const Feed = require('./models/feed')
const Tag = require('./models/tag')
const Refer = require('./models/refer')
const Comment = require('./models/comment')
// Topic.belongsToMany(Feed, { through: 'topic_feed' })
Comment.belongsTo(Account) 
Comment.belongsTo(Feed)
Feed.belongsToMany(Tag, { through: 'feed_tag', timestamps: false })
Feed.belongsToMany(Refer, { through: 'feed_refer', timestamps: false })

Topic.belongsToMany(Feed, { through: 'topic_feed', timestamps: false })
// Tag.belongsToMany(Feed, { through: 'feed_tag' })

const PORT = process.env.PORT || 3000

models.sequelize.sync({
  force: false
}).then(_=> {
  app.listen(PORT, () => console.log(`server is running localhost:${PORT}`))
})
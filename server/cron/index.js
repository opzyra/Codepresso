const cron = require('node-cron')
const TopicFeed = require('../models/topic_feed')

const fs = require('fs')

cron.schedule('0 0 23 * * *', async () => {
  const query = `
      select *
      from topic_feed as tf, feed as f
      where tf.feedIdx = f.idx
      AND tf.topicIdx = :idx
    `
  const result = await TopicFeed.sequelize.query(query, { replacements: { idx: 2 } })
  const feeds = result[0]

  feeds.forEach(el => {
    fs.writeFile(`/opt/github/TIL/${el.title}.md`, `# ${el.title}\n` + `${el.contents}`, 'utf-8', err => {
      // TODO Log를 남기자.. 시스템에서 잘 처리됬는지 기록을 남겨야 알 수 있다.
      if(err){
        console.log(err)
      }else{
        console.log(`/opt/github/TIL/${el.title}.md is WRITE DONE!`)
      }
    })
  })

})

module.exports = cron
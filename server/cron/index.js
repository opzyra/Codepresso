const cron = require('node-cron')
const { sequelize } = require('../models')
const fs = require('fs')

cron.schedule('0 0 23 * * *', async () => {
  const query = `
      select *
      from topic_feed as tf, feed as f
      where tf.feedIdx = f.idx
      AND tf.topicIdx = :idx
    `
  const qrs = await sequelize.query(query, { replacements: { idx: 2 } })
  const feeds = qrs[0][0]

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

cron.schedule('0 30 0 * * *', async () => {
  let query = `
      SELECT
        (SELECT COUNT(*) FROM topic) AS topic,
        (SELECT COUNT(*) FROM feed) AS feed,
        (SELECT COUNT(*) FROM tag) AS tag,
        (SELECT COUNT(*) FROM comment) AS comment
      FROM DUAL
    `
  const qrs = await sequelize.query(query)
  const counts = qrs[0][0]
  let routes = []

  for (let i = 1; i <= counts.topic; i++) {
    routes.push(`/devlog/topic/${i}`)
  }
  for (let i = 1; i <= counts.feed; i++) {
    routes.push(`/devlog/feed/${i}`)
  }
  fs.writeFile(`/opt/client/prerender.config.js`, `module.exports = ['${routes.join('\', \'')}']`, 'utf-8', err => {
    // TODO Log를 남기자.. 시스템에서 잘 처리됬는지 기록을 남겨야 알 수 있다.
    if(err){
      console.log(err)
    }else{
      console.log(`DONE!`)
    }
  })

})

module.exports = cron
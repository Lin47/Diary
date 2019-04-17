const cloud = require('./node_modules/wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const { currPage } = event
  const { OPENID } = cloud.getWXContext()
  try {
    return await db.collection('diarys').where({
      _openid: OPENID,
    })
    .skip(10 * (currPage - 1))
    .limit(10)
    .get()
  } catch (e) {
    console.error(e)
  }
}
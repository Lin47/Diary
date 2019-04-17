const cloud = require('./node_modules/wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  try {
    return await db.collection('password').where({
      _openid: OPENID,
    })
    .count()
  } catch (e) {
    console.error(e)
  }
}
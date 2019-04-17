const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const { password } = event
  const { OPENID } = cloud.getWXContext()
  try {
    return await db.collection('password').where({
      _openid: OPENID,
      password
    })
    .count()
  } catch (e) {
    console.error(e)
  }
}
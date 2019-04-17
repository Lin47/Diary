const cloud = require('./node_modules/wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { oldPassword, newPassword } = event
  try {
    return await db.collection('password').where({
      _openid: OPENID,
      password: oldPassword
    })
    .update({
      data: {
        password: newPassword
      }
    })
  } catch (e) {
    console.error(e)
  }
}
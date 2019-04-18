const cloud = require('./node_modules/wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { title, isLock, content, files, id } = event
  try {
    return await db.collection('diarys').where({
      _openid: OPENID,
      _id: id
    })
    .update({
      data: {
        title, 
        isLock, 
        content, 
        files
      }
    })
  } catch (e) {
    console.error(e)
  }
}
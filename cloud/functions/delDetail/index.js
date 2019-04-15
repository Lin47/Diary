const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const { id } = event
  try {
    return await db.collection('diarys').where({
      _id: id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}
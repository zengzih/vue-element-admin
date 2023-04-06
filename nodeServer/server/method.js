const connect = require('../connect/index')

class RequestMethod {
  constructor() {
    this.connect = connect
  }
  getAllCourse(userId) {
    const sql = `select * from `
    console.log(sql)
  }
}

module.exports = RequestMethod

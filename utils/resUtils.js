class Error {
  constructor(message) {
    this.code = 210;
    this.message = message;
  }
}

class Success {
  constructor(data) {
    this.code = 200
    this.data = data
  }
}

const resUtils = {
  sendSuccess(data) {
    return new Success(data)
  },
  sendError(data) {
    return new Error(data)
  },
  sendErrParams(res) {
    res.send(new Error('error params!'))
  }
}

module.exports = resUtils
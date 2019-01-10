import request from '.'

const refer = {
  findAll () {
    return request.get('/tag').then(({ data }) => data)
  },
  findOrCreate (param) {
    return request.post('/refer', param).then(({ data }) => data[0])
  }
}

export default refer

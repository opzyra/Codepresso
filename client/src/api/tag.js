import request from '.'

const tag = {
  findAll () {
    return request.get('/tag').then(({ data }) => data)
  },
  findOrCreate (param) {
    return request.post('/tag', param).then(({ data }) => data[0])
  }
}

export default tag

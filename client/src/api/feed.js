import request from '.'

const feed = {
  createOne (param) {
    return request.post('/feed', param).then(({ data }) => data)
  },
  findByPk (param) {
    return request.get(`/feed/${param}`).then(({ data }) => data)
  },
  findAll () {
    return request.get('/feed').then(({ data }) => data)
  },
  updateOne (param) {
    return request.put(`/feed/${param.idx}`, param).then(({ data }) => data)
  },
  findAndCountAll (limit) {
    return request.get(`/feed/latest?limit=${limit}`).then(({ data }) => data)
  }
}

export default feed

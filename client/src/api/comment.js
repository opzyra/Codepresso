import request from '.'

const comment = {
  createOne (param) {
    return request.post('/comment', param).then(({ data }) => data)
  },
  findAll () {
    return request.get('/comment').then(({ data }) => data)
  },
  updateOne (param) {
    return request.put(`/comment/${param.idx}`, param).then(({ data }) => data)
  },
  findAndCountByPk (param) {
    return request.get(`/comment/${param.idx}`).then(({ data }) => data)
  },
  deleteOne (param) {
    return request.delete(`/comment/${param.idx}`).then(({ data }) => data)
  }
}

export default comment

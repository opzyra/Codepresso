import request from '.'

const topic = {
  createOne (param) {
    return request.post('/topic', param).then(({ data }) => data)
  },
  findByPk (param) {
    return request.get(`/topic/${param}`).then(({ data }) => data)
  },
  findAndCountAll (offset, limit) {
    return request.get(`/topic?offset=${offset}&limit=${limit}`).then(({ data }) => data)
  },
  updateOne (param) {
    return request.put(`/topic/${param.idx}`, param).then(({ data }) => data)
  }
}

export default topic

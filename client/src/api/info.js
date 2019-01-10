import request from '.'

const info = {
  devlogCount () {
    return request.get('/info/devlog/count').then(({ data }) => data)
  }
}

export default info

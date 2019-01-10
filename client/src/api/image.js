import axios from 'axios'
import request from './'

const image = {
  upload (path, form) {
    return axios({
      method: 'post',
      url: `${request.domain + path}`,
      data: form,
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(({ data }) => data)
  }
}

export default image

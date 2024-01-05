import request from '@/utils/request'

export const getInfoApi = (params) => {
  return request({
    url: '/project/info',
    method: 'get',
    data: params
  })
}

export const getListApi = (params) => {
  return request({
    url: '/project/list',
    method: 'get',
    data: params
  })
}



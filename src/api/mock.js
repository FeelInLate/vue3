import Mock from 'mockjs'
import homeApi from './mockData/home'
import permissionApi from './mockData/permission'
// 拦截请求
Mock.mock('/home/getTableData',homeApi.getTableData)
Mock.mock('/home/getCountData',homeApi.getCountData)
Mock.mock('/home/getEchartsData',homeApi.getEchartsData)
Mock.mock('/permission/getMenu','post',permissionApi.getMenu)

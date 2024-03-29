import request from '@/config/axios'

// CRM门店 VO
export interface StoreVO {
  id: number // 编号
  name: string // 门店名称
  introduction: string // 门店简介
  phone: string // 门店手机
  areaId: number // 区域编号
  detailAddress: string // 门店详细地址
  logo: string // 门店 logo
  openingTime: localtime // 营业开始时间
  closingTime: localtime // 营业结束时间
  latitude: number // 纬度
  longitude: number // 经度
  status: number // 门店状态
}

// CRM门店 API
export const StoreApi = {
  // 查询CRM门店分页
  getStorePage: async (params: any) => {
    return await request.get({ url: `/crm/store/page`, params })
  },

  // 查询CRM门店详情
  getStore: async (id: number) => {
    return await request.get({ url: `/crm/store/get?id=` + id })
  },

  // 新增CRM门店
  createStore: async (data: StoreVO) => {
    return await request.post({ url: `/crm/store/create`, data })
  },

  // 修改CRM门店
  updateStore: async (data: StoreVO) => {
    return await request.put({ url: `/crm/store/update`, data })
  },

  // 删除CRM门店
  deleteStore: async (id: number) => {
    return await request.delete({ url: `/crm/store/delete?id=` + id })
  },

  // 导出CRM门店 Excel
  exportStore: async (params) => {
    return await request.download({ url: `/crm/store/export-excel`, params })
  },
}
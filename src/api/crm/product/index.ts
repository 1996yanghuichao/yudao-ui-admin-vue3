import request from '@/config/axios'
export interface ProductVO {
  id: number
  name: string
  no: string
  unit: number
  unitName: string
  price: number
  status: number
  categoryId: number
  categoryName?: string
  description: string
  ownerUserId: number
}

// 查询产品列表
export const getProductPage = async (params) => {
  return await request.get({ url: `/crm/product/page`, params })
}

// 获得产品精简列表
export const getProductSimpleList = async () => {
  return await request.get({ url: `/crm/product/simple-list` })
}

// 查询产品详情
export const getProduct = async (id: number) => {
  return await request.get({ url: `/crm/product/get?id=` + id })
}

// 新增产品
export const createProduct = async (data: ProductVO) => {
  return await request.post({ url: `/crm/product/create`, data })
}

// 修改产品
export const updateProduct = async (data: ProductVO) => {
  return await request.put({ url: `/crm/product/update`, data })
}

// 删除产品
export const deleteProduct = async (id: number) => {
  return await request.delete({ url: `/crm/product/delete?id=` + id })
}

// 导出产品 Excel
export const exportProduct = async (params) => {
  return await request.download({ url: `/crm/product/export-excel`, params })
}

// CRM 产品单位 VO
export interface ProductUnitVO {
  id: number // 单位编号
  name: string // 单位名字
  status: number // 单位状态
}

// CRM 产品单位 API
export const ProductUnitApi = {
  // 查询CRM 产品单位分页
  getProductUnitPage: async (params: any) => {
    return await request.get({ url: `/crm/product-unit/page`, params })
  },

  // 查询CRM 产品单位详情
  getProductUnit: async (id: number) => {
    return await request.get({ url: `/crm/product-unit/get?id=` + id })
  },

  // 新增CRM 产品单位
  createProductUnit: async (data: ProductUnitVO) => {
    return await request.post({ url: `/crm/product-unit/create`, data })
  },

  // 修改CRM 产品单位
  updateProductUnit: async (data: ProductUnitVO) => {
    return await request.put({ url: `/crm/product-unit/update`, data })
  },

  // 删除CRM 产品单位
  deleteProductUnit: async (id: number) => {
    return await request.delete({ url: `/crm/product-unit/delete?id=` + id })
  },

  // 导出CRM 产品单位 Excel
  exportProductUnit: async (params) => {
    return await request.download({ url: `/crm/product-unit/export-excel`, params })
  },
}

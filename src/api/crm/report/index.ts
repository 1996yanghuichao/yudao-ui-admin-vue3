import request from '@/config/axios'

// CRM报表 VO
export interface ReportVO {
  id: number // 编号
  storeName: string // 门店
  contractNo: string // 合同号
  customerName: string // 客商
  orderDate: Date // 日期
  orderPrice: number // 销售金额
  returnPrice: number // 回款金额
  debtPrice: number // 欠款金额
}

// CRM报表 API
export const ReportApi = {
  //合同分析报表
  // 查询CRM报表分页
  getStoreContract: async (params: any) => {
    return await request.get({ url: `/crm/report/store-contract`, params })
  },

  // 导出CRM报表 Excel
  exportReport: async (params) => {
    return await request.download({ url: `/crm/report/export-excel`, params })
  },

  //门店销售分析报表
  //报表分页
  getStoreSell: async (params: any) => {
    return await request.get({ url: `/crm/report/store-sell`, params })
  },
}

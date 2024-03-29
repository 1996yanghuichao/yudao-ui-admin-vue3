<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="门店名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入门店名称" />
      </el-form-item>
      <el-form-item label="门店简介" prop="introduction">
        <el-input v-model="formData.introduction" placeholder="请输入门店简介" />
      </el-form-item>
      <el-form-item label="门店手机" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入门店手机" />
      </el-form-item>
      <el-form-item label="区域编号" prop="areaId">
        <el-input v-model="formData.areaId" placeholder="请输入区域编号" />
      </el-form-item>
      <el-form-item label="门店详细地址" prop="detailAddress">
        <el-input v-model="formData.detailAddress" placeholder="请输入门店详细地址" />
      </el-form-item>
      <el-form-item label="门店 logo" prop="logo">
        <el-input v-model="formData.logo" placeholder="请输入门店 logo" />
      </el-form-item>
      <el-form-item label="营业开始时间" prop="openingTime">
        <el-date-picker
          v-model="formData.openingTime"
          type="date"
          value-format="x"
          placeholder="选择营业开始时间"
        />
      </el-form-item>
      <el-form-item label="营业结束时间" prop="closingTime">
        <el-date-picker
          v-model="formData.closingTime"
          type="date"
          value-format="x"
          placeholder="选择营业结束时间"
        />
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="formData.latitude" placeholder="请输入纬度" />
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="formData.longitude" placeholder="请输入经度" />
      </el-form-item>
      <el-form-item label="门店状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { StoreApi, StoreVO } from '@/api/crm/store'

/** CRM门店 表单 */
defineOptions({ name: 'StoreForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  name: undefined,
  introduction: undefined,
  phone: undefined,
  areaId: undefined,
  detailAddress: undefined,
  logo: undefined,
  openingTime: undefined,
  closingTime: undefined,
  latitude: undefined,
  longitude: undefined,
  status: undefined,
})
const formRules = reactive({
  name: [{ required: true, message: '门店名称不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '门店手机不能为空', trigger: 'blur' }],
  areaId: [{ required: true, message: '区域编号不能为空', trigger: 'blur' }],
  detailAddress: [{ required: true, message: '门店详细地址不能为空', trigger: 'blur' }],
  logo: [{ required: true, message: '门店 logo不能为空', trigger: 'blur' }],
  openingTime: [{ required: true, message: '营业开始时间不能为空', trigger: 'blur' }],
  closingTime: [{ required: true, message: '营业结束时间不能为空', trigger: 'blur' }],
  latitude: [{ required: true, message: '纬度不能为空', trigger: 'blur' }],
  longitude: [{ required: true, message: '经度不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '门店状态不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await StoreApi.getStore(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as StoreVO
    if (formType.value === 'create') {
      await StoreApi.createStore(data)
      message.success(t('common.createSuccess'))
    } else {
      await StoreApi.updateStore(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    name: undefined,
    introduction: undefined,
    phone: undefined,
    areaId: undefined,
    detailAddress: undefined,
    logo: undefined,
    openingTime: undefined,
    closingTime: undefined,
    latitude: undefined,
    longitude: undefined,
    status: undefined,
  }
  formRef.value?.resetFields()
}
</script>
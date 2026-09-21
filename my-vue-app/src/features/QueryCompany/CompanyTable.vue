<template>
    <v-data-table
        :headers="headers"
        :items="companies"
        item-value="code"
        :items-per-page="5"
        :items-per-page-options="[5, 10, 15, 20, 100]"
        :loading="loading"
        loading-text="資料載入中..."
    />
    <v-data-table
        :headers="headersArea"
        :items="area"
        item-value="code"
        :items-per-page="5"
        :items-per-page-options="[5, 10, 15, 20, 100]"
        :loading="loadingArea"
        loading-text="資料載入中..."
    />

</template>


<script setup>
import { ref, onMounted } from 'vue'
import { getCompanyList } from '../../api/ihrms'

const headers = [
    { title: '公司代碼', key: 'code' },
    { title: '公司名稱', key: 'name' },
    { title: '英文名稱', key: 'eName' }
]

const companies = ref([])
const loading = ref(false)

onMounted(async () => {
    loading.value = true

    try {
        companies.value = await getCompanyList()
    } catch (error) {
        console.error('取得公司清單失敗：', error)
    } finally {
        loading.value = false
    }
})

const headersArea = [
    { title: '父代碼', key: 'parentCompany' },
    { title: '代碼', key: 'code' },
    { title: '中文', key: 'name' },
    { title: '英文', key: 'eName' }
]

const area = ref([])
const loadingArea = ref(false)
import { getAreaList } from '../../api/ihrms'

onMounted(async () => {
    loadingArea.value = true

    try {
        area.value = await getAreaList()
    } catch (error) {
        console.error('取得工作地點失敗：', error)
    } finally {
        loadingArea.value = false
    }
})





</script>
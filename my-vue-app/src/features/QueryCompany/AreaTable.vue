<template>
    <div>
    <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        clearable
        hide-details
    />
    <v-data-table
        v-model:search="search"
        :headers="headersArea"
        :items="area"
        item-value="code"
        :items-per-page="5"
        :items-per-page-options="[5, 10, 15, 20, 100]"
        :loading="loadingArea"
        loading-text="資料載入中..."
        class="area-table"
    />
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
const search = ref('')

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
    area.value = [];

    try {
        area.value = await getAreaList()
    } catch (error) {
        console.error('取得工作地點失敗：', error)
    } finally {
        loadingArea.value = false
    }
})

</script>

<style scoped>
.area-table :deep(thead th) {
    background-color: #86754d;
    color: white;
}
</style>
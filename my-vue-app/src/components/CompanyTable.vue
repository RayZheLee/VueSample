<template>
    <div>
        <!-- 右上方重新整理按鈕 -->
        <div class="table-actions">
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                clearable
                hide-details
            />
            <v-btn
                prepend-icon="mdi-refresh"
                color="grey-darken-1"
                variant="flat"
                :loading="loading"
                @click="getCompanies(true)"
            >
                Refresh
            </v-btn>
        </div>

        <v-data-table
            v-model:search="search"
            :headers="headers"
            :items="companies"
            item-value="code"
            :items-per-page="5"
            :items-per-page-options="[5, 10, 15, 20, 100]"
            :loading="loading"
            loading-text="資料載入中..."
            class="area-table"
        />
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { getCompanyList } from '../api/ihrms'
const search = ref('')

const headers = [
    { title: '公司代碼', key: 'code' },
    { title: '公司名稱', key: 'name' },
    { title: '英文名稱', key: 'eName' }
]

const companies = ref([])
const loading = ref(false)
import { useAlert } from '../utils/Alert'

const alert = useAlert()

async function getCompanies(showDialog = false) {
    try {
        loading.value = true
        companies.value = [];

        const data = await getCompanyList()

        companies.value = data

        if (showDialog ) {

            alert.show(
                'success',
                '成功',
                { text: '資料載入成功！' }
            )
        }

    } catch (error) {
        console.error(error)
        alert.show(
            'error',
            '失敗QQ',
            { text: '資料載入失敗！' }
        )
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getCompanies(false)
})

</script>

<style scoped>
.table-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
}
.area-table :deep(thead th) {
    background-color: #86754d;
    color: white;
}
</style>

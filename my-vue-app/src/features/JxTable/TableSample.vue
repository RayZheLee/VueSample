<template>
    <v-container fluid>
            <div class="card-content">
                <PageTitle title="表格共用元件示範" />
                <section class="mb-8">
                    <h2 class="text-subtitle-1 font-weight-bold mb-3">元件說明</h2>

                    <v-card v-for="api in apiDocs" :key="api.name" class="mb-4 pa-6">
                        <h3 class="mb-1">{{ api.name }}</h3>
                        <div class="text-body-2 text-medium-emphasis mb-4">{{ api.desc }}</div>

                        <div v-for="section in api.sections" :key="section.title" class="mb-4">
                            <h4 class="text-subtitle-2 mb-2">{{ section.title }}</h4>
                            <v-table density="comfortable">
                                <thead>
                                    <tr>
                                        <th>名稱</th>
                                        <th>型別</th>
                                        <th>必填</th>
                                        <th>預設值</th>
                                        <th>說明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="p in section.rows" :key="p.name">
                                        <td><code>{{ p.name }}</code></td>
                                        <td><code>{{ p.type }}</code></td>
                                        <td>{{ p.required === null ? '-' : p.required ? '是' : '否' }}</td>
                                        <td>{{ p.default }}</td>
                                        <td>{{ p.desc }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </div>

                        <div v-if="api.returns" class="text-body-2">
                            <strong>回傳：</strong>
                            <code>{{ api.returns.type }}</code>
                            {{ api.returns.desc }}
                        </div>
                    </v-card>
                </section>

                <h2 class="text-subtitle-1 font-weight-bold mb-3">實際範例</h2>
                <v-card class="px-6 py-2">
                    <jx-table 
                        ref="testTable"
                        :headers="companyHeaders"
                        :fetch-data="getCompanyList"
                        item-value="code"
                        :show-add-button="true"
                        @click:add="showDialog"/>
                </v-card>
            </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import PageTitle from '../../components/PageTitle.vue'
import JxTable from '../../components/JxTable.vue'
import { getCompanyList } from '../../api/ihrms.js'
import { JxAlert } from '../../utils/JxAlert.js'

const testTable = ref(null)

const companyHeaders = [
    { title: '公司代碼', key: 'code' },
    { title: '公司名稱', key: 'name' },
    { title: '英文名稱', key: 'eName' }
]

const apiDocs = [
    {
    name: '<ListTable />',
    desc: '共用列表元件。內建搜尋、載入狀態、新增按鈕與錯誤提示，掛載時自動呼叫 fetchData 取得資料。',
    sections: [
        {
            title: 'Props',
            rows: [
                {
                name: 'headers',
                type: 'Array',
                required: true,
                default: '-',
                desc: '欄位定義，格式同 v-data-table 的 headers。每項的 key 同時用來對應 item.<key> 插槽。',
                },
                {
                name: 'fetchData',
                type: '() => Promise<Array>',
                required: true,
                default: '-',
                desc: '取得資料的函式，元件掛載時自動呼叫一次。失敗時會自動顯示「資料載入失敗」提示。',
                },
                {
                name: 'showSearch',
                type: 'boolean',
                required: false,
                default: 'true',
                desc: '是否顯示上方工具列（搜尋框、toolbar-actions 插槽、新增按鈕）。設為 false 時整列隱藏。',
                },
                {
                name: 'itemValue',
                type: 'string',
                required: false,
                default: 'undefined',
                desc: '每列的唯一識別欄位名稱，未設定時由 v-data-table 自行處理。',
                },
                {
                name: 'showAddButton',
                type: 'boolean',
                required: false,
                default: 'false',
                desc: '是否顯示新增按鈕，需 showSearch 為 true 才會出現。',
                },
                {
                name: 'addButtonText',
                type: 'string',
                required: false,
                default: "'新增'",
                desc: '新增按鈕的文字。',
                },
                {
                name: '其他屬性',
                type: 'v-data-table props',
                required: false,
                default: '-',
                desc: '未列出的屬性會直接傳給 v-data-table，例如 items-per-page、density。',
                },
            ],
        },
        {
            title: 'Events',
            rows: [
                {
                name: 'click:add',
                type: '-',
                required: null,
                default: '-',
                desc: '按下新增按鈕時觸發，沒有參數。',
                },
                {
                name: 'fetch-error',
                type: 'Error',
                required: null,
                default: '-',
                desc: 'fetchData 失敗時觸發，參數為錯誤物件。元件同時會彈出錯誤提示並寫入 console。',
                },
            ],
        },
        {
            title: 'Slots',
            rows: [
                {
                name: 'toolbar-actions',
                type: '-',
                required: null,
                default: '-',
                desc: '新增按鈕左邊的自訂區塊，可放匯出等額外按鈕，需 showSearch 為 true。',
                },
                {
                name: 'item.<key>',
                type: 'v-data-table slot props',
                required: null,
                default: '-',
                desc: '自訂某欄位的儲存格內容，<key> 對應 headers 的 key，例如 #item.status="{ item }"。',
                },
            ],
        },
    ],
    },
]

async function showDialog() {
    JxAlert.show('success', '成功', {text: '開啟新增 Dialog。'})

    // 新增完成後重新載入列表
    await testTable.value.load()
}
</script>

<style scoped>
.card-content {
    padding: 20px 24px 0;
}
</style>
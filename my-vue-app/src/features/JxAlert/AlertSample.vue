<template>
    <v-container fluid>
        <div class="card-content">
            <PageTitle title="Alert 共用元件示範" />
            <p class="text-body-2 text-medium-emphasis mb-6">
                點擊按鈕查看效果。
            </p>
            <section class="mb-8">
                <h2 class="text-subtitle-1 font-weight-bold mb-3">元件說明</h2>

                <v-card 
                    v-for="api in apiDocs" 
                    :key="api.name" 
                    class="mb-4 pa-6">
                    <h3 class="mb-1">{{ api.name }}</h3>
                    <div class="text-body-2 text-medium-emphasis mb-4">{{ api.desc }}</div>

                    <v-table density="comfortable">
                        <thead>
                            <tr>
                                <th>參數</th>
                                <th>型別</th>
                                <th>必填</th>
                                <th>預設值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in api.params" :key="p.name">
                                <td><code>{{ p.name }}</code></td>
                                <td><code>{{ p.type }}</code></td>
                                <td>{{ p.required ? '是' : '否' }}</td>
                                <td>{{ p.default }}</td>
                                <td>{{ p.desc }}</td>
                            </tr>
                        </tbody>
                    </v-table>

                    <div class="mt-4 text-body-2">
                        <strong>回傳：</strong>
                        <code>{{ api.returns.type }}</code>
                        {{ api.returns.desc }}
                    </div>
                </v-card>
            </section>

            <template 
                v-for="group in groups" 
                :key="group.title" 
                class="mb-8">
                <h2 class="text-subtitle-1 font-weight-bold mb-3">
                    {{ group.title }}
                </h2>
                <v-card>
                    <template
                        v-for="demo in group.demos" 
                        :key="demo.label" 
                        class="mb-3">
                        <v-row no-gutters class="pa-6">
                            <v-col cols="12">
                                <h3 class="my-1">
                                    {{ demo.label }}
                                </h3>
                            </v-col>
                            <v-col cols="12" md="3">
                                <div class="text-caption text-medium-emphasis ">
                                    {{ demo.note }}
                                </div>
                                <div class="ma-8">
                                    <v-btn 
                                        :color="demo.color || 'primary'" 
                                        variant="flat" 
                                        @click="demo.run">
                                        {{ demo.label }}
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="12" md="9">
                                <pre class="code">{{ demo.code }}</pre>
                            </v-col>
                        </v-row>
                    </template>
                </v-card>
            </template>

            <v-card class="my-2 pa-6">
                <div class="d-flex align-center mb-2">
                    <h3 class="my-1 text-subtitle-1">
                        確認結果紀錄
                    </h3>
                    <v-btn 
                        variant="tonal" 
                        class="mx-2"
                        @click="logs = []">
                        清除
                    </v-btn>
                </div>
                <div 
                    v-if="!logs.length" 
                    class="text-body-2 text-medium-emphasis">
                    尚無紀錄，點擊「確認對話框」類的按鈕後會顯示 confirm 的回傳值。
                </div>
                <div 
                    v-for="(log, i) in logs" 
                    :key="i" 
                    class="text-body-2">
                    {{ log }}
                </div>
            </v-card>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import PageTitle from '../../components/PageTitle.vue'
import { JxAlert } from '../../utils/JxAlert.js'

const logs = ref([])
const addLog = (label, result) => {
    const time = new Date().toLocaleTimeString('zh-TW', { hour12: false })
    logs.value.unshift(`[${time}] ${label} → ${result}`)
}

// 模擬 API
const fakeApi = (ok) =>
    new Promise((resolve, reject) =>
        setTimeout(() => (ok ? resolve() : reject(new Error('伺服器忙碌中，請稍後再試'))), 600)
    )

// Props
const apiDocs = [
    {
        name: 'JxAlert.show(type, title, options)',
        desc: '一般提示。依類型決定圖示與預設行為，適用成功、錯誤、警告、資訊等訊息。',
        params: [
        {
            name: 'type',
            type: "'success' | 'error' | 'warning' | 'info'",
            required: true,
            default: '-',
            desc: '提示類型，決定圖示。success 會 1.5 秒後自動關閉，其餘需手動按確定。',
        },
        {
            name: 'title',
            type: 'string',
            required: true,
            default: '-',
            desc: '標題文字。',
        },
        {
            name: 'options',
            type: 'object',
            required: false,
            default: '{}',
            desc: '內容 text，或任何 SweetAlert2 原生選項（會覆蓋預設值）。',
        },
        ],
        returns: {
        type: 'Promise',
        desc: '視窗關閉後完成，一般提示不需要處理回傳值。',
        },
    },
    {
        name: 'JxAlert.confirm(title, options)',
        desc: '確認對話框。使用者按下確定才繼續執行，適用刪除、送出簽核等需二次確認的操作。',
        params: [
        {
            name: 'title',
            type: 'string',
            required: true,
            default: '-',
            desc: '標題文字。',
        },
        {
            name: 'options.text',
            type: 'string',
            required: false,
            default: "''",
            desc: '標題下方的說明文字。',
        },
        {
            name: 'options.icon',
            type: 'string',
            required: false,
            default: "'question'",
            desc: '圖示，可用 question、warning、info、success、error。',
        },
        {
            name: 'options.confirmText',
            type: 'string',
            required: false,
            default: "'確定'",
            desc: '確認按鈕文字。',
        },
        {
            name: 'options.cancelText',
            type: 'string',
            required: false,
            default: "'取消'",
            desc: '取消按鈕文字。',
        },
        {
            name: 'options.showCancel',
            type: 'boolean',
            required: false,
            default: 'true',
            desc: '是否顯示取消按鈕。設為 false 就變成只有「確定」的對話框。',
        },
        {
            name: 'options.其他',
            type: 'SweetAlert2 選項',
            required: false,
            default: '-',
            desc: '其餘原生選項（例如 html、allowOutsideClick）可直接放入，會覆蓋預設值。',
        },
        ],
        returns: {
        type: 'Promise<boolean>',
        desc: '按確定為 true，其餘（取消、點外面、ESC）都是 false。',
        },
    },
]

// 各範例資料
const groups = [
    {
        title: '一般提示：alert.show(type, title, options)',
        demos: [
            {
                label: '成功',
                color: 'success',
                note: '1.5 秒後自動關閉',
                code: `JxAlert.show('success', 
           '儲存成功')`,
                run: () => JxAlert.show('success', '儲存成功'),
            },
            {
                label: '錯誤',
                color: 'error',
                note: '需手動關閉，可附說明文字',
                code: `JxAlert.show('error', 
           '儲存失敗', 
           {text: '伺服器忙碌中，請稍後再試'})`,
                run: () => JxAlert.show('error', '儲存失敗', { text: '伺服器忙碌中，請稍後再試' }),
            },
            {
                label: '資訊',
                color: 'info',
                note: '需手動關閉',
                code: `JxAlert.show('info', 
           '提醒', 
           {text: '此單據已送出簽核'})`,
                run: () => JxAlert.show('info', '提醒', { text: '此單據已送出簽核' }),
            },
            {
                label: '警告',
                color: 'warning',
                note: '新增的類型',
                code: `JxAlert.show('warning', 
           '注意', 
           {text: '此操作會影響其他人員'})`,
                run: () => JxAlert.show('warning', '注意', { text: '此操作會影響其他人員' }),
            },
            {
                label: '需手動關閉的成功',
                color: 'success',
                note: '覆蓋預設的 timer 與按鈕',
                code: `JxAlert.show('success', 
           '匯入完成', 
           {
               timer: 0,
               showConfirmButton: true
           })`,
                run: () => JxAlert.show('success', '匯入完成', { timer: 0, showConfirmButton: true }),
            },
            {
                label: '自訂 SweetAlert2 選項',
                color: 'secondary',
                note: '任何原生選項都能直接傳入',
                code: `JxAlert.show('info', 
           '處理中', 
           {
               html: '請稍候，約 <b>3</b> 秒',
               timer: 3000,
               timerProgressBar: true,
               allowOutsideClick: false
           })`,
                run: () =>
                    JxAlert.show('info', '處理中', {
                        html: '請稍候，約 <b>3</b> 秒',
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    }),
            },
        ],
    },
    {
        title: '確認對話框：alert.confirm(title, options)',
        demos: [
            {
                label: '確認刪除',
                color: 'error',
                note: '回傳 true / false',
                code: `if (await JxAlert.confirm('確定要刪除嗎？', { text: '刪除後無法復原', icon: 'warning'})) {
    await deleteItem()
}`,
                run: async () => {
                    const ok = await JxAlert.confirm('確定要刪除嗎？', {
                        text: '刪除後無法復原',
                        icon: 'warning',
                    })
                    addLog('確認刪除', ok)
                },
            },
            {
                label: '只有「確定」按鈕',
                note: 'showCancel: false',
                code: `await JxAlert.confirm('操作完成', {
    showCancel: false,
    icon: 'success'
})`,
                run: async () => {
                    const ok = await JxAlert.confirm('操作完成', { showCancel: false, icon: 'success' })
                    addLog('只有確定按鈕', ok)
                },
            },
            {
                label: '自訂按鈕文字',
                note: 'confirmText / cancelText',
                code: `await JxAlert.confirm('是否送出簽核？', {
    text: '送出後無法修改',
    confirmText: '送出',
    cancelText: '再想想'
})`,
                run: async () => {
                    const ok = await JxAlert.confirm('是否送出簽核？', {
                        text: '送出後無法修改',
                        confirmText: '送出',
                        cancelText: '再想想',
                    })
                    addLog('自訂按鈕文字', ok)
                },
            },
        ],
    },
    {
        title: '組合範例',
        demos: [
            {
                label: '確認 → 儲存成功',
                color: 'success',
                note: '確認後模擬 API 成功',
                code: `if (!await JxAlert.confirm('確定要儲存嗎？')) return
                
try {
    await api.save()
    JxAlert.show('success', '儲存成功')
} catch (e) {
    JxAlert.show('error', '儲存失敗', { text: e.message })
}`,
                run: () => saveFlow(true),
            },
            {
                label: '確認 → 儲存失敗',
                color: 'error',
                note: '確認後模擬 API 失敗',
                code: `// 同上，API 丟出例外時顯示錯誤訊息`,
                run: () => saveFlow(false),
            },
        ],
    },
]

async function saveFlow(apiOk) {
    if (!(await JxAlert.confirm('確定要儲存嗎？'))) {
        addLog('確認 → 儲存', '使用者取消')
        return
    }
    try {
        await fakeApi(apiOk)
        JxAlert.show('success', '儲存成功')
        addLog('確認 → 儲存', '成功')
    } catch (e) {
        JxAlert.show('error', '儲存失敗', { text: e.message })
        addLog('確認 → 儲存', '失敗')
    }
}
</script>

<style scoped>
.code {
    margin: 0;
    padding: 12px 14px;
    border-radius: 4px;
    background: rgba(var(--v-theme-on-surface), 0.05);
    font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
}

.card-content {
    padding: 20px 24px 0;
}
</style>
<template>
    <v-container fluid>
        <div class="card-content">
            <PageTitle title="部門/人員選擇器" />

            <section class="mb-8">
                <h2 class="text-subtitle-1 font-weight-bold mb-3">
                    元件說明
                </h2>

                <v-card 
                    v-for="api in apiDocs" 
                    :key="api.name" 
                    class="mb-4 pa-6">
                    <h3 class="mb-1">
                        {{ api.name }}
                    </h3>
                    <div class="text-body-2 text-medium-emphasis mb-4">
                        {{ api.desc }}
                    </div>

                    <div 
                        v-for="section in api.sections" 
                        :key="section.title" 
                        class="mb-4">
                        <h4 class="text-subtitle-2 mb-2">
                            {{ section.title }}
                        </h4>
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
                                <tr 
                                    v-for="p in section.rows" 
                                    :key="p.name">
                                    <td><code>{{ p.name }}</code></td>
                                    <td><code>{{ p.type }}</code></td>
                                    <td>{{ p.required === null ? '-' : p.required ? '是' : '否' }}</td>
                                    <td>{{ p.default }}</td>
                                    <td>{{ p.desc }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </v-card>
            </section>

            <section class="mb-8">
                <h2 class="text-subtitle-1 font-weight-bold mb-3">
                    使用範例
                </h2>

                <v-row>
                    <v-col cols="12" md="6">
                        <v-card class="pa-6 h-100">
                            <h3 class="my-1">
                                人員選擇器（多選）
                            </h3>
                            <div class="text-caption text-medium-emphasis">
                                single-select 為 false，可勾選多位人員。
                            </div>

                            <div class="my-6">
                                <jx-button 
                                    @click="empDialogOpen = true">
                                    選擇人員
                                </jx-button>
                            </div>

                            <jx-emp-dialog 
                                v-model="empDialogOpen" 
                                v-model:selected="selectedEmp"
                                :fetch-data="getEmpList" 
                                :single-select="false" 
                                @confirm="onEmpConfirm"
                                @cancel="onEmpCancel" />

                            <div class="text-subtitle-2">
                                已選取人員：
                            </div>
                            <div 
                                v-if="!selectedEmp.length" 
                                class="text-body-2 text-medium-emphasis">
                                尚未選取
                            </div>
                            <v-list 
                                v-else lines="one" 
                                density="compact">
                                <v-list-item 
                                    v-for="emp in selectedEmp" 
                                    :key="emp.EMPLOYEE_NO"
                                    :subtitle="emp.EMPLOYEE_CNAME" />
                            </v-list>

                            <pre class="code mt-4" v-text="codes.emp" />
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-card class="pa-6 h-100">
                            <h3 class="my-1">
                                部門選擇器（單選）
                            </h3>
                            <div class="text-caption text-medium-emphasis">
                                single-select 為 true，只能選一個部門。
                            </div>

                            <div class="my-6">
                                <jx-button 
                                    @click="deptDialogOpen = true">
                                    選擇部門
                                </jx-button>
                            </div>

                            <jx-dept-dialog 
                                v-model="deptDialogOpen" 
                                v-model:selected="selectedDept"
                                :fetch-data="getDepList" 
                                :single-select="true" 
                                @confirm="onDeptConfirm"
                                @cancel="onDeptCancel" />

                            <div class="text-subtitle-2">
                                已選取部門：</div>
                            <div 
                                v-if="!selectedDept.length" 
                                class="text-body-2 text-medium-emphasis">
                                尚未選取
                            </div>
                            <v-list 
                                v-else 
                                lines="one" 
                                density="compact">
                                <v-list-item 
                                    v-for="dept in selectedDept" 
                                    :key="dept.depId" 
                                    :subtitle="dept.cName" />
                            </v-list>

                            <pre class="code mt-4" v-text="codes.dept" />
                        </v-card>
                    </v-col>
                </v-row>
            </section>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { getEmpList, getDepList } from '../../api/ihrms.js'
import PageTitle from '../../components/PageTitle.vue'
import JxButton from '../../components/JxButton.vue'
import JxEmpDialog from '../../components/JxEmpDialog.vue'
import JxDeptDialog from '../../components/JxDeptDialog.vue'

const empDialogOpen = ref(false)
const deptDialogOpen = ref(false)

const selectedEmp = ref([])
const selectedDept = ref([])

function onEmpConfirm() {
    // selectedEmp.value 已經是子元件同步好的選取結果
    console.log('已選取人員：', selectedEmp.value)
}

function onEmpCancel() {
    selectedEmp.value = []
}

function onDeptConfirm() {
    console.log('已選取部門：', selectedDept.value)
}

function onDeptCancel() {
    selectedDept.value = []
}

const codes = {
    emp: `<JxEmpDialog
  v-model="empDialogOpen"
  v-model:selected="selectedEmp"
  :fetch-data="getEmpList"
  :single-select="false"
  @confirm="onEmpConfirm"
  @cancel="onEmpCancel"
/>`,
    dept: `<JxDeptDialog
  v-model="deptDialogOpen"
  v-model:selected="selectedDept"
  :fetch-data="getDepList"
  :single-select="true"
  @confirm="onDeptConfirm"
  @cancel="onDeptCancel"
/>`,
}

// 兩個選擇器的 props / events / 對外方法相同，只有 API 與資料欄位不同
const commonProps = [
    {
        name: 'v-model',
        type: 'boolean',
        required: false,
        default: 'false',
        desc: '控制對話框開關。',
    },
    {
        name: 'v-model:selected',
        type: 'Array',
        required: false,
        default: '[]',
        desc: '已選取的項目（完整物件）。勾選或移除晶片時即時同步，不必等按下確認；也可由外部傳入預設選取項目。',
    },
    {
        name: 'fetchData',
        type: '() => Promise<Array>',
        required: true,
        default: '-',
        desc: '取得可選清單的函式。第一次開啟對話框時才呼叫，不是元件掛載時；失敗會彈出錯誤提示，下次開啟會再重試。',
    },
    {
        name: 'singleSelect',
        type: 'boolean',
        required: false,
        default: 'false',
        desc: 'true 為單選；false 為多選，多選時上方會顯示已選項目的標籤，可個別移除，表頭的全選只會選取目前頁面。',
    },
    {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        desc: '停用「確認新增」按鈕。沒有選取任何項目時，按鈕也會自動停用。',
    },
]

const commonEvents = [
    {
        name: 'confirm',
        type: '-',
        required: null,
        default: '-',
        desc: '按下「確認新增」時觸發，沒有參數，觸發後對話框自動關閉。選取結果已同步在 v-model:selected。',
    },
    {
        name: 'cancel',
        type: '-',
        required: null,
        default: '-',
        desc: '按下「取消」或點擊對話框外面時觸發，沒有參數。同時會清空搜尋字串並關閉對話框。',
    },
]

const commonMethods = [
    {
        name: 'load()',
        type: '() => Promise<void>',
        required: null,
        default: '-',
        desc: '重新呼叫 fetchData 載入清單，例如來源資料異動後，透過 ref 呼叫：dialogRef.value.load()。',
    },
]

const apiDocs = [
    {
        name: '<JxEmpDialog />',
        desc: '人員選擇器。',
        sections: [
            { title: 'Props', rows: commonProps },
            { title: 'Events', rows: commonEvents },
            { title: '對外方法（透過 ref 呼叫）', rows: commonMethods },
            {
                title: 'selected 項目欄位',
                rows: [
                    {
                        name: 'EMPLOYEE_NO',
                        type: 'string',
                        required: null,
                        default: '-',
                        desc: '員工編號，可作為唯一識別。',
                    },
                    {
                        name: 'EMPLOYEE_CNAME',
                        type: 'string',
                        required: null,
                        default: '-',
                        desc: '員工中文姓名。',
                    },
                ],
            },
        ],
    },
    {
        name: '<JxDeptDialog />',
        desc: '部門選擇器。',
        sections: [
            { title: 'Props', rows: commonProps },
            { title: 'Events', rows: commonEvents },
            { title: '對外方法（透過 ref 呼叫）', rows: commonMethods },
            {
                title: 'selected 項目欄位',
                rows: [
                    {
                        name: 'depId',
                        type: 'string',
                        required: null,
                        default: '-',
                        desc: '部門代碼，可作為唯一識別。',
                    },
                    {
                        name: 'cName',
                        type: 'string',
                        required: null,
                        default: '-',
                        desc: '部門中文名稱。',
                    },
                ],
            },
        ],
    },
]
</script>

<style scoped>
.card-content {
    padding: 20px 24px 0;
}

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
</style>
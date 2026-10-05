<template>
    <v-container fluid>
        <div class="card-content">
            <PageTitle title="按鈕共用元件" />

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
                    顏色與樣式一覽
                </h2>
                <v-card class="pa-6">
                    <v-table density="comfortable">
                        <thead>
                            <tr>
                                <th>color</th>
                                <th 
                                    v-for="s in styles" 
                                    :key="s.label">
                                    <div>{{ s.label }}</div>
                                    <code v-if="s.code">{{ s.code }}</code>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="c in colors" 
                                :key="c">
                                <td><code>{{ c }}</code></td>
                                <td 
                                    v-for="s in styles" 
                                    :key="s.label" 
                                    :class="{ 'on-dark': c === 'white' }">
                                    <jx-button 
                                        :color="c" 
                                        v-bind="s.props">
                                        <v-icon 
                                            v-if="s.props.isIcon">
                                            mdi-pencil
                                        </v-icon>
                                        <template v-else>按鈕</template>
                                    </jx-button>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </section>

            <section class="mb-8">
                <h2 class="text-subtitle-1 font-weight-bold mb-3">
                    使用範例
                </h2>

                <v-card class="mb-3 pa-6">
                    <h3 class="my-1">
                        點擊事件
                    </h3>
                    <div class="text-caption text-medium-emphasis">
                        事件與原生屬性會直接傳給按鈕，使用 @click 即可。
                    </div>
                    <div class="my-6">
                        <jx-button 
                            @click="onSave">
                            儲存
                        </jx-button>
                    </div>
                    <pre class="code" v-text="codes.click" />
                </v-card>

                <v-card class="mb-3 pa-6">
                    <h3 class="my-1">
                        圖示搭配文字
                    </h3>
                    <div class="text-caption text-medium-emphasis">
                        圖示與文字都放在預設插槽，v-icon 加上 start 可與文字保持間距。
                    </div>
                    <div class="my-6">
                        <jx-button>
                            <v-icon start>mdi-plus</v-icon>新增
                        </jx-button>
                    </div>
                    <pre class="code" v-text="codes.iconText" />
                </v-card>

                <v-card class="mb-3 pa-6">
                    <h3 class="my-1">
                        純 icon 按鈕
                    </h3>
                    <div class="text-caption text-medium-emphasis">
                        is-icon 的內容放 v-icon，適合表格操作欄的編輯、刪除。
                    </div>
                    <div class="my-6 d-flex ga-2">
                        <jx-button 
                            is-icon 
                            is-small 
                            color="secondary">
                            <v-icon>mdi-pencil</v-icon>
                        </jx-button>
                        <jx-button 
                            is-icon 
                            is-small 
                            color="danger">
                            <v-icon>mdi-delete</v-icon>
                        </jx-button>
                    </div>
                    <pre class="code" v-text="codes.icon" />
                </v-card>
            </section>
        </div>
    </v-container>
</template>

<script setup>
import PageTitle from '../../components/PageTitle.vue'
import JxButton from '../../components/JxButton.vue'
import { JxAlert } from '../../utils/JxAlert.js'

const colors = ['primary', 'secondary', 'success', 'danger','warning' ,'gray']

const styles = [
    { label: '實心', code: '', props: {} },
    { label: '外框', code: 'is-outline', props: { isOutline: true } },
    { label: '純文字', code: 'is-text', props: { isText: true } },
    { label: '縮小', code: 'is-small', props: { isSmall: true } },
    { label: '純 icon', code: 'is-icon', props: { isIcon: true } },
    { label: '禁止操作', code: 'disabled', props: { disabled: true } },
]

const codes = {
    click: `<jx-button @click="onSave">儲存</jx-button>`,
    iconText: `<jx-button>
  <v-icon start>mdi-plus</v-icon>新增
</jx-button>`,
    icon: `<jx-button is-icon is-small color="secondary">
  <v-icon>mdi-pencil</v-icon>
</jx-button>`,
}

const apiDocs = [
    {
        name: '<jx-button />',
        desc: '共用按鈕元件。以顏色與樣式 props 組合出專案內常用的按鈕外觀。',
        sections: [
            {
                title: 'Props',
                rows: [
                    {
                        name: 'disabled',
                        type: 'boolean',
                        required: false,
                        default: 'false',
                        desc: '禁止操作。',
                    },
                    {
                        name: 'color',
                        type: "'primary' | 'secondary' | 'success' | 'danger' | 'gray'",
                        required: false,
                        default: "'primary'",
                        desc: '按鈕顏色。',
                    },
                    {
                        name: 'isOutline',
                        type: 'boolean',
                        required: false,
                        default: 'false',
                        desc: '外框樣式。',
                    },
                    {
                        name: 'isSmall',
                        type: 'boolean',
                        required: false,
                        default: 'false',
                        desc: '縮小版樣式。',
                    },
                    {
                        name: 'isIcon',
                        type: 'boolean',
                        required: false,
                        default: 'false',
                        desc: '純 icon 樣式，插槽內放 v-icon。',
                    },
                    {
                        name: 'isText',
                        type: 'boolean',
                        required: false,
                        default: 'false',
                        desc: '純文字樣式。isIcon、isText、isOutline 同時為 true 時，優先順序為 isIcon / isText 高於 isOutline。',
                    },
                ],
            },
            {
                title: 'Events',
                rows: [
                    {
                        name: 'click',
                        type: 'MouseEvent',
                        required: null,
                        default: '-',
                        desc: '原生事件，直接使用 @click 即可。disabled 時不會觸發。',
                    },
                ],
            },
            {
                title: 'Slots',
                rows: [
                    {
                        name: 'default',
                        type: '-',
                        required: null,
                        default: '-',
                        desc: '按鈕內容，可放文字或 v-icon。',
                    },
                ],
            },
        ],
    },
]

function onSave() {
    JxAlert.show('success', '儲存成功')
}
</script>

<style scoped>
.card-content {
    padding: 20px 24px 0;
}

.on-dark {
    background: #37474f;
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
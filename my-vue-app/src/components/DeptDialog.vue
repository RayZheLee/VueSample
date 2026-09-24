<template>
    <v-dialog 
        v-model="dialog" 
        max-width="700px" 
        @click:outside="handleCancel">
        <v-card>
            <v-card-title 
                class="font-weight-black px-6 mt-3">
                請選擇部門
            </v-card-title>
            <v-card-text>
                <v-chip-group 
                    v-if="!singleSelect && selected.length > 0" 
                    class="mt-3" 
                    column 
                    active-class="">
                    <v-chip 
                        v-for="(item, index) in selected" 
                        :key="item.depId ?? index" 
                        closable
                        @click:close="removeSelected(index)" 
                        class="gray-300">
                        {{ item.cName }}
                    </v-chip>
                </v-chip-group>

                <v-text-field 
                    v-model="search" 
                    append-inner-icon="mdi-magnify" 
                    label="Search" 
                    single-line
                    hide-details></v-text-field>

                <v-data-table 
                    v-model="selected" 
                    :headers="headers" 
                    :items="items" 
                    item-value="depId"
                    :search="search" 
                    :select-strategy="singleSelect ? 'single' : 'page'" 
                    show-select 
                    return-object
                    :loading="loading"></v-data-table>
            </v-card-text>

            <v-card-actions>
                <v-btn 
                    color="primary-base" 
                    variant="flat"
                    :disabled="confirmDisabled"
                    @click="handleConfirm">
                    確認新增
                </v-btn>
                <v-btn 
                    class="gray-300" 
                    @click="handleCancel">
                    取消
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

import { ref, computed, inject, watch } from 'vue'

const props = defineProps({
    fetchData:    { type: Function, required: true },
    singleSelect: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['confirm', 'cancel'])

// v-model="..."          -> 對話框開關狀態
// v-model:selected="..." -> 已選取的部門陣列
const dialog = defineModel({ type: Boolean, default: false })
const selected = defineModel('selected', { type: Array, default: () => [] })

const loading = ref(true)
const search = ref('')
const items = ref([])

const headers = [
    { title: '部門簡碼', key: 'depId' },
    { title: '部門名稱', key: 'cName' },
]

const confirmDisabled = computed(() => props.disabled || selected.value.length === 0)

// 由外層 app.provide('swalFire', fn) 注入，取代原本未定義的 this.SwalFire
const swalFire = inject('swalFire', null)

async function load() {
    loading.value = true
    try {
        items.value = await props.fetchData()
    } catch (error) {
        swalFire?.(false, '取得資料異常，請通知IT單位。')
        console.error(error)
    } finally {
        loading.value = false
    }
}

function clearSearch() {
    search.value = ''
}

function removeSelected(index) {
    selected.value.splice(index, 1)
}

function handleConfirm() {
    emit('confirm')
    dialog.value = false
}

function handleCancel() {
    emit('cancel')
    clearSearch()
    dialog.value = false
}

watch(dialog, (newVal) => {
    if (newVal && items.value.length === 0) {
        load()
    }
})

defineExpose({ load })
</script>
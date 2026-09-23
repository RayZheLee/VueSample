<template>
  <div>
    <div v-if="showSearch" class="d-flex justify-space-between mb-3">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="pt-0 mt-0 mr-3"
      ></v-text-field>
      <div class="d-flex align-center">
        <slot name="toolbar-actions"></slot>
        <v-btn
          v-if="showAddButton"
          color="primary-base"
          class="white--text ml-3"
          elevation="0"
          @click="emit('click:add')"
        >
          <v-icon left>mdi-plus</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <div v-else></div>

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :search="search"
      :item-key="itemKey"
      v-bind="$attrs"
    >
      <template
        v-for="slotName in customSlotNames"
        #[slotName]="slotProps"
      >
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>

import { ref, computed, useSlots } from 'vue'

const props = defineProps({
  headers:       { type: Array,    required: true },
  fetchData:     { type: Function, required: true },
  showSearch:    { type: Boolean,  default: true },
  itemKey:       { type: String,   default: undefined },
  showAddButton: { type: Boolean,  default: false },
  addButtonText: { type: String,   default: '新增' },
})

const emit = defineEmits(['click:add', 'fetch-error'])

const items   = ref([])
const loading = ref(true)
const search  = ref('')

const slots = useSlots()
const customSlotNames = computed(() =>
  props.headers
    .map(h => `item.${h.key}`)
    .filter(name => name in slots)
)

async function load() {
  loading.value = true
  try {
    items.value = await props.fetchData()
  } catch (error) {
    emit('fetch-error', error)
    console.error('資料載入失敗', error)
  } finally {
    loading.value = false
  }
}

load();

defineExpose({ load })
</script>
<template>
  <div>
    <div v-if="showSearch" class="d-flex justify-space-between align-end mb-3">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        variant="underlined"
        single-line
        hide-details
        class="pt-0 mt-0 mr-3"
      ></v-text-field>
      <div class="d-flex align-center">
        <slot name="toolbar-actions"></slot>
        <jx-button
          v-if="showAddButton"
          @click="emit('click:add')"
        >
          <v-icon start>mdi-plus</v-icon>{{ addButtonText }}
        </jx-button>
      </div>
    </div>
    <div v-else></div>

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :search="search"
      :item-value="itemValue"
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
import { JxAlert } from '../utils/JxAlert.js'
import JxButton from '../components/JxButton.vue'

const props = defineProps({
  headers:       { type: Array,    required: true },
  fetchData:     { type: Function, required: true },
  showSearch:    { type: Boolean,  default: true },
  itemValue:     { type: String,   default: undefined },
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

    JxAlert.show('error', '資料載入失敗')
  } finally {
    loading.value = false
  }
}

load();

defineExpose({ load })
</script>
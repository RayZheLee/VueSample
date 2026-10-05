<template>
    <v-btn
        :color="vuetifyColor"
        :variant="variant"
        :size="isSmall ? 'small' : 'default'"
        :icon="isIcon"
        :disabled="disabled"
        :class="{ 'text-white': whiteText }"
    >
        <slot />
    </v-btn>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    disabled:  { type: Boolean, default: false },
    color: {
        type: String,
        default: 'primary',
        validator: (v) => ['primary', 'secondary', 'success', 'danger' ,'warning', 'gray'].includes(v),
    },
    isOutline: { type: Boolean, default: false },
    isSmall:   { type: Boolean, default: false },
    isIcon:    { type: Boolean, default: false },
    isText:    { type: Boolean, default: false },
})

const COLOR_MAP = {
    primary:   'primary-base',
    secondary: 'secondary-base',
    success:   'state-success',
    danger:    'state-error',
    warning:   'state-warning',
    gray:      'gray-300',
}

// 樣式優先順序：isIcon / isText > isOutline > 實心
const variant = computed(() => {
    if (props.isIcon || props.isText) return 'text'
    if (props.isOutline) return 'outlined'
    return 'flat'
})

const vuetifyColor = computed(() => {
    // 灰色實心用淺灰底；外框 / 純文字 / icon 改用深灰，避免淺灰字看不清楚
    if (props.color === 'gray' && variant.value !== 'flat') return 'gray-900-dark'
    return COLOR_MAP[props.color]
})

// 綠色、橘色實心按鈕固定白字
const whiteText = computed(
    () => (props.color === 'success' || props.color === 'warning') && variant.value === 'flat'
)
</script>
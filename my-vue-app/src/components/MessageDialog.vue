<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
    >
        <v-card>
            <!-- 標題 -->
            <v-card-title class="d-flex align-center">
                <v-icon
                    :color="messageType.color"
                    class="mr-2"
                >
                    {{ messageType.icon }}
                </v-icon>

                {{ title }}
            </v-card-title>

            <!-- 訊息 -->
            <v-card-text>
                {{ message }}
            </v-card-text>

            <!-- 按鈕 -->
            <v-card-actions class="justify-end">
                <v-btn
                    :color="messageType.color"
                    @click="close"
                >
                    確定
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '提示'
    },
    message: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'info'
    }
})

const emit = defineEmits(['update:modelValue'])

const dialog = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const messageType = computed(() => {
    const types = {
        success: {
            icon: 'mdi-check-circle',
            color: 'success'
        },
        error: {
            icon: 'mdi-alert-circle',
            color: 'error'
        },
        warning: {
            icon: 'mdi-alert',
            color: 'warning'
        },
        info: {
            icon: 'mdi-information',
            color: 'info'
        }
    }

    return types[props.type] || types.info
})

function close() {
    dialog.value = false
}
</script>
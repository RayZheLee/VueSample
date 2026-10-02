<template>
    <h1 class="text-h5 mb-1">
        {{ title }}
    </h1>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.page-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
}
</style>


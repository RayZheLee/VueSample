```vue
<template>
    <div class="page-title">
        {{ title }}
    </div>
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
```

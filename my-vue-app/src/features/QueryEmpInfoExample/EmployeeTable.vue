```vue
<template>
    <v-data-table
        :headers="headers"
        :items="members"
        item-value="accountID"
        :items-per-page="5"
        :items-per-page-options="[5, 10, 15, 20, 100]"
    />
</template>

<script setup>
defineProps({
    members: {
        type: Array,
        default: () => []
    }
})

const headers = [
    { title: '帳號', key: 'accountID' },
    { title: '姓名', key: 'displayName' },
    { title: '部門', key: 'department' },
    { title: 'Email', key: 'email' }
]

</script>
```

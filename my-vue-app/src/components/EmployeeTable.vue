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
import { ref } from 'vue'

const headers = [
    { title: '帳號', key: 'accountID' },
    { title: '姓名', key: 'displayName' },
    { title: '部門', key: 'department' },
    { title: 'Email', key: 'email' }
]

const members = ref([
    { accountID: 'A001', displayName: '王小明', department: '資訊部', email: 'test1@example.com' },
    { accountID: 'A002', displayName: '陳小華', department: '財務部', email: 'test2@example.com' },
    { accountID: 'A003', displayName: '李大華', department: '人資部', email: 'test3@example.com' },
    { accountID: 'A004', displayName: '林志偉', department: '法務部', email: 'test4@example.com' },
    { accountID: 'A005', displayName: '張雅婷', department: '行銷部', email: 'test5@example.com' },
    { accountID: 'A006', displayName: '黃俊傑', department: '資訊部', email: 'test6@example.com' },
    { accountID: 'A007', displayName: '吳佩珊', department: '採購部', email: 'test7@example.com' },
    { accountID: 'A008', displayName: '劉冠廷', department: '業務部', email: 'test8@example.com' },
    { accountID: 'A009', displayName: '蔡佳穎', department: '財務部', email: 'test9@example.com' },
    { accountID: 'A010', displayName: '楊承翰', department: '資訊部', email: 'test10@example.com' },
    { accountID: 'A011', displayName: '許庭瑋', department: '製造部', email: 'test11@example.com' },
    { accountID: 'A012', displayName: '鄭凱文', department: '工程部', email: 'test12@example.com' },
    { accountID: 'A013', displayName: '周怡君', department: '客服部', email: 'test13@example.com' },
    { accountID: 'A014', displayName: '郭建宏', department: '管理部', email: 'test14@example.com' },
    { accountID: 'A015', displayName: '何欣怡', department: '人資部', email: 'test15@example.com' },
    { accountID: 'A016', displayName: '曾俊豪', department: '業務部', email: 'test16@example.com' },
    { accountID: 'A017', displayName: '沈怡安', department: '行銷部', email: 'test17@example.com' },
    { accountID: 'A018', displayName: '廖家豪', department: '工程部', email: 'test18@example.com' },
    { accountID: 'A019', displayName: '謝宜蓁', department: '法務部', email: 'test19@example.com' },
    { accountID: 'A020', displayName: '洪偉倫', department: '資訊部', email: 'test20@example.com' }
])
</script>
```

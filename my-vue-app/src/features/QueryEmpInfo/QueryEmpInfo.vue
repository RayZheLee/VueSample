```vue
<template>
    <v-app>
        <v-main>
            <v-container fluid>
                <div class="card-content">

                    <!-- 標題 -->
                    <PageTitle title="員工資料" />
                    <v-card>
                        <!-- Table -->
                        <EmployeeTable />
                    </v-card>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import PageTitle from '../../components/PageTitle.vue'
import EmployeeTable from './EmployeeTable.vue'

</script>

<style scoped>
.card-content {
    padding: 20px 24px 0;
}
</style>
```

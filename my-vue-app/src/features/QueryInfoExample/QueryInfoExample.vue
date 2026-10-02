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
                        <EmployeeTable
                            :members="members"
                        />
                    </v-card>
                </div>
                <div class="card-content">
                    <PageTitle title="分公司資料" />
                    <v-card>
                    <CompanyTable />
                    </v-card>
                </div>
                <div class="card-content">
                    <PageTitle title="工作地點資料" />
                    <v-card>
                    <AreaTable />
                    </v-card>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import PageTitle from '../../components/PageTitle.vue'
import EmployeeTable from '../../components/EmployeeTable.vue'
import AreaTable from '../../components/AreaTable.vue';
import CompanyTable from '../../components/CompanyTable.vue'
import { members } from './employeeService.js'

</script>

<style scoped>
.card-content {
    padding: 20px 24px 0;
}
</style>
```

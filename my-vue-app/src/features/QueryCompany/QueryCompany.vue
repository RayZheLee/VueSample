<template>
    <v-app>
        <v-main>
            <v-container fluid>
                    <div class="card-content">
                        <PageTitle title="分公司資料" />
                        <v-card>
                        <CompanyTable />
                        </v-card>
                    </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import PageTitle from '../../components/PageTitle.vue'
import CompanyTable from './CompanyTable.vue'
</script>

<style scoped>
.card-content {
    padding: 20px 24px 0;
}
</style>
<template>
    <v-app>
        <v-main>
            <v-container fluid>
                    <div class="card-content">
                        <PageTitle title="表格共用元件測試" />
                        <v-card>
                        <ListTable      
                            ref="testTable"
                            :headers="companyHeaders"
                            :fetch-data="getCompanyList"
                            itemKey="code"
                            :show-add-button="false"/>
                        </v-card>
                    </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import PageTitle from '../../components/PageTitle.vue'
import ListTable from '../../components/ListTable.vue'
import { getCompanyList } from '../../api/ihrms'

const companyHeaders = [
    { title: '公司代碼', key: 'code' },
    { title: '公司名稱', key: 'name' },
    { title: '英文名稱', key: 'eName' }
]
</script>

<style scoped>
.card-content {
    padding: 20px 24px 0;
}
</style>
<template>
    <v-container fluid>
        <div class="card-content">
            <PageTitle title="部門/人員選擇器" />
            <p class="text-body-2 text-medium-emphasis mb-6">
                點擊按鈕查看效果。
            </p>

            <v-row>
                <v-col>
                    <v-btn 
                        color="primary-base" 
                        variant="flat"
                        @click="empDialogOpen = true">
                        選擇人員
                    </v-btn>
                    <jx-emp-dialog 
                        v-model="empDialogOpen" 
                        v-model:selected="selectedEmp" 
                        :fetch-data="getEmpList"
                        :single-select="false"
                        @confirm="onEmpConfirm" 
                        @cancel="onEmpCancel" />
                    <div>已選取人員：</div>
                    <v-list lines="one">
                        <v-list-item
                            v-for="(emp, index) in selectedEmp"
                            :key="emp.EMPLOYEE_NO"
                            :title="index+1"
                            :subtitle= "emp.EMPLOYEE_CNAME"
                        ></v-list-item>
                    </v-list>
                </v-col>
                <v-col>               
                    <v-btn 
                        color="primary-base" 
                        variant="flat"
                        @click="deptDialogOpen = true">
                        選擇部門
                    </v-btn>
                    <jx-dept-dialog 
                        v-model="deptDialogOpen" 
                        v-model:selected="selectedDept" 
                        :fetch-data="getDepList"
                        :single-select="true"
                        @confirm="onDeptConfirm" 
                        @cancel="onDeptCancel" />
                    <div>已選取部門：</div>
                    <v-list lines="one">
                        <v-list-item
                            v-for="dept in selectedDept"
                            :key="dept.depId"
                            :subtitle= "dept.cName"
                        ></v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script setup>
    import { ref } from 'vue'
    import { getEmpList, getDepList } from '../../api/ihrms.js'
    import PageTitle from '../../components/PageTitle.vue'
    import JxEmpDialog from '../../components/JxEmpDialog.vue'
    import JxDeptDialog from '../../components/JxDeptDialog.vue'

    const empDialogOpen = ref(false)
    const deptDialogOpen = ref(false)

    const selectedEmp = ref([])
    const selectedDept = ref([])

    function onEmpConfirm() {
        // selectedEmp.value 已經是子元件同步好的選取結果
        console.log('已選取人員：', selectedEmp.value)
        // 這裡接原本 EmpDialogConfirm 的商業邏輯，例如送出表單、呼叫 API 等
    }

    function onEmpCancel() {
        selectedEmp.value = []
    }

    function onDeptConfirm() {
        console.log('已選取部門：', selectedDept.value)
    }

    function onDeptCancel() {
        selectedDept.value = []
    }
</script>

<style scoped>
.card-content {
    padding: 20px 24px 0;
}
</style>
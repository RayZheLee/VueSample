<template>
    <v-app>
        <v-main>
            <v-container fluid>
                    <div class="card-content">
                        <PageTitle title="部門/人員選擇器" />
                        <v-row>
                            <v-col>
                                <v-btn 
                                    color="primary-base" 
                                    variant="flat"
                                    @click="empDialogOpen = true">
                                    選擇人員
                                </v-btn>
                                <emp-dialog 
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
                                <dept-dialog 
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
        </v-main>
    </v-app>
</template>

<script setup>
    import { ref } from 'vue'
    import { getEmpList, getDepList } from '../../api/ihrms'
    import PageTitle from '../../components/PageTitle.vue'
    import EmpDialog from '../../components/EmpDialog.vue'
    import DeptDialog from '../../components/DeptDialog.vue'

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
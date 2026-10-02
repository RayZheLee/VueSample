<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template> -->

```vue
<template>
    <v-app>
        <v-layout>

            <!-- 左側選單 -->
            <v-navigation-drawer
                v-model="drawer"
                :rail="rail"
            >
                <!-- Logo / 系統名稱 -->
                <v-list-item
                    prepend-icon="mdi-airplane"
                    title="Vue Sample"
                    subtitle="Portal"
                    class="py-3"
                />

                <v-divider />

                <v-list>

                    <!-- 首頁 -->
                    <v-list-item
                        to="/"
                        prepend-icon="mdi-home"
                        title="首頁"
                    />

                    <v-divider class="my-2" />

                    <!-- 功能 -->
                    <v-list-subheader>
                        功能
                    </v-list-subheader>

                    <v-list-item
                        to="/QueryEmpInfo"
                        prepend-icon="mdi-account"
                        title="員工查詢"
                    />

                    <v-list-item
                        to="/QueryCompany"
                        prepend-icon="mdi-domain"
                        title="公司查詢"
                    />

                    <v-list-item
                        to="/QueryCompanyInfo"
                        prepend-icon="mdi-map-marker"
                        title="公司 / 工作地點查詢"
                    />

                    <v-divider class="my-2" />

                    <!-- Sample -->
                    <v-list-subheader>
                        Sample
                    </v-list-subheader>
  
                    <v-list-item
                        to="/AlertSample"
                        prepend-icon="mdi-alert"
                        title="Alert Sample"
                    />
                    <v-list-item
                        to="/ButtonSample"
                        prepend-icon="mdi-button-cursor"
                        title="Button Sample"
                    />
                    <v-list-item
                        to="/DialogSample"
                        prepend-icon="mdi-forum-outline"
                        title="Dialog Sample"
                    />
                    <v-list-item
                        to="/TableSample"
                        prepend-icon="mdi-table-cog"
                        title="Table Sample"
                    />
                </v-list>

                <template #append>

                    <v-divider />

                    <v-list-item
                        prepend-icon="mdi-menu"
                        title="收合選單"
                        @click="rail = !rail"
                    />

                </template>

            </v-navigation-drawer>

            <!-- 主要內容 -->
            <v-main>
                <router-view />
            </v-main>

        </v-layout>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)
</script>
```

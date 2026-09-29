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

            <!-- 左側 BAR -->
            <v-navigation-drawer
                v-model="drawer"
                :rail="rail"
            >
                <v-list>

                    <!-- 收合按鈕 -->
                    <v-list-item
                        prepend-icon="mdi-menu"
                        @click="rail = !rail"
                    >
                        <template #title>
                            選單
                        </template>
                    </v-list-item>

                    <!-- 員工查詢 -->
                    <v-list-item
                        to="/QueryEmployee"
                        prepend-icon="mdi-account"
                        title="員工查詢"
                    />

                    <!-- 公司查詢 -->
                    <v-list-item
                        to="/QueryCompany"
                        prepend-icon="mdi-domain"
                        title="公司查詢"
                    />

                    <!-- 公司 / 工作地點查詢 -->
                    <v-list-item
                        to="/QueryCompanyInfo"
                        prepend-icon="mdi-map-marker"
                        title="公司 / 工作地點查詢"
                    />

                </v-list>
            </v-navigation-drawer>

            <!-- 右側主要內容 -->
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

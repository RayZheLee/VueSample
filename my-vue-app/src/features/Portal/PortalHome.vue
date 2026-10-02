<template>
    <v-container fluid class="pa-8">

        <!-- 歡迎區 -->
        <v-card
            class="pa-8 mb-6"
            rounded="xl"
            color="primary-base"
        >
            <v-row align="center">

                <v-col cols="12" md="8">

                    <div class="text-overline">
                        VUE SAMPLE PORTAL
                    </div>

                    <div class="text-h3 font-weight-bold mb-3">
                        歡迎使用 Vue Sample
                    </div>

                    <div class="text-body-1">
                        Vue 3 + Vuetify 4 範例與功能展示平台
                    </div>

                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    class="text-center"
                >
                    <v-icon size="120">
                        mdi-airplane
                    </v-icon>
                </v-col>

            </v-row>
        </v-card>


        <!-- 功能 -->
        <div class="text-h5 font-weight-bold mb-4">
            功能
        </div>

        <v-row>

            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <v-card
                    to="/QueryEmpInfo"
                    hover
                    height="180"
                    class="pa-6"
                    color="primary-lighter"
                >
                    <v-icon
                        size="48"
                        color="secondary-darker"
                        class="mb-4"
                    >
                        mdi-account
                    </v-icon>

                    <div class="text-h6">
                        員工查詢
                    </div>

                    <div class="text-body-2 text-medium-emphasis">
                        查詢員工基本資料
                    </div>
                </v-card>
            </v-col>


            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <v-card
                    to="/QueryCompany"
                    hover
                    height="180"
                    class="pa-6"
                    color="primary-lighter"
                >
                    <v-icon
                        size="48"
                        color="secondary-darker"
                        class="mb-4"
                    >
                        mdi-domain
                    </v-icon>

                    <div class="text-h6">
                        公司查詢
                    </div>

                    <div class="text-body-2 text-medium-emphasis">
                        查詢公司相關資訊
                    </div>
                </v-card>
            </v-col>


            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <v-card
                    to="/QueryCompanyInfo"
                    hover
                    height="180"
                    class="pa-6"
                    color="primary-lighter"
                >
                    <v-icon
                        size="48"
                        color="secondary-darker"
                        class="mb-4"
                    >
                        mdi-map-marker
                    </v-icon>

                    <div class="text-h6">
                        公司 / 工作地點
                    </div>

                    <div class="text-body-2 text-medium-emphasis">
                        查詢公司與工作地點
                    </div>
                </v-card>
            </v-col>

        </v-row>


        <!-- UI Sample -->
        <div class="text-h5 font-weight-bold mt-8 mb-4">
            UI Sample
        </div>

        <v-row>

            <v-col
                cols="12"
                sm="6"
            >
                <v-card
                    to="/DialogSample"
                    hover
                    variant="outlined"
                    class="pa-5"
                >
                    <v-icon
                        color="secondary-darker"
                        class="mr-2"
                    >
                        mdi-forum-outline
                    </v-icon>

                    Dialog Sample
                </v-card>
            </v-col>

            <v-col
                cols="12"
                sm="6"
            >
                <v-card
                    to="/TableSample"
                    hover
                    variant="outlined"
                    class="pa-5"
                >
                    <v-icon
                        color="secondary-darker"
                        class="mr-2"
                    >
                        mdi-table-cog
                    </v-icon>

                    Table Sample
                </v-card>
            </v-col>

            <v-col
                cols="12"
                sm="6"
            >
                <v-card
                    to="/AlertSample"
                    hover
                    variant="outlined"
                    class="pa-5"
                >
                    <v-icon
                        color="secondary-darker"
                        class="mr-2"
                    >
                        mdi-alert
                    </v-icon>

                    Alert Sample
                </v-card>
            </v-col>

        </v-row>

    </v-container>
</template>
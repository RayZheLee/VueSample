import { request } from './request.js'

const API_BASE_URL = 'https://ihrms-uat.starlux-airlines.com/api'

export async function getCompanyList() {
    const result = await request(API_BASE_URL, '/employeeInfo')

    return result.data.companyList
}

export async function getAreaList() {
    const result = await request(API_BASE_URL, '/employeeInfo')

    return result.data.areaList
}

export async function getDepList() {
    const result = await request(API_BASE_URL, '/employeeInfo')

    return result.data.depList
}

export async function getEmpList() {
    const result = await request(API_BASE_URL, '/employeeInfo')

    return result.data.empList
}
<template>
    <el-form  :model="loginForm" class="login-container">
        <h3>登录页面</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { reactive } from 'vue';
import axios from "axios";
import {useSelectMenuStore} from '../stores/selectMenu.js'
import { useRouter } from 'vue-router';
const selectMenuStore = useSelectMenuStore()
const loginForm = reactive({
    username: '',
    password: ''
})
const router = useRouter()
const login = async () => {
    await axios.post("/permission/getMenu",loginForm).then((res) => {
        // console.log(res)
        selectMenuStore.setMenu(res.data.data.menu)
        selectMenuStore.addMenu(router)
        // console.log(res.data.data.token)
        selectMenuStore.setToken(res.data.data.token)
        router.push({
            name: 'home'
        })
    });
}
</script>
<style lang="less" scoped>
.login-container{
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 180px auto;
    h3{
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }
    :deep(.el-form-item__content){
        justify-content: center;
    }
}
    
</style>
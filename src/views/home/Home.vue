<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../../public/favicon.ico" alt="" />
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="role">管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间<span>2022-7-11</span></p>
                    <p>上次登录地点:<span>北京</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" style="margin-top: 20px; height: 450px">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLable" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px">
            <div class="num">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name"
                    shadow="hover">
                    <component class="icons" :is="item.icon" :style="{ background: item.color }">111</component>
                    <div class="details">
                        <p class="num">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px;" shadow="hover">
                <div id="chartLine" style="height: 280px;"></div>
            </el-card>
            <div class="graph">
                <el-card style="height: 260px;" shadow="hover">
                    <div id="chartBar" style="height: 240px;"></div>
                </el-card>
                <el-card style="height: 260px;" shadow="hover">
                    <div id="chartPie" style="height: 240px;"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
import * as echarts from 'echarts'
// const chartLine = ref(null)
let tableData = ref([]);
let countData = ref([]);
// 关于表格的配置
let xOptions = reactive({
    // 图例文字颜色
    textStyle: {
        color: "#333",
    },
    grid: {
        left: "20%",
    },
    // 提示框
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "#333",
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
})
let pieOptions = reactive({
    tooltip: {
        trigger: "item",
    },
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: [],
})
let orderData = reactive({
    xData: [],
    series: [],
})
let userData = reactive({
    xData: [],
    series: [],
})
let videoData = reactive({
    series: []
})
const tableLable = {
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
};
const getTableList = async () => {
    await axios.get("/home/getTableData").then((res) => {
        // console.log(res)
        if (res.data.code === 200) {
            tableData.value = res.data.data.tableData;
        }
    });
};
const getCountList = async () => {
    await axios.get("/home/getCountData").then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
            countData.value = res.data.data.countData;
        }
        // console.log(res.data.data.countData);
    });
};
const getEchartsData = async () => {
    await axios.get("/home/getEchartsData").then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
            orderData.xData = res.data.data.orderData.date;
            const keyArray = Object.keys(res.data.data.orderData.data[0])
            const series = []
            keyArray.forEach((key) => {
                series.push({
                    name: key,
                    data: res.data.data.orderData.data.map((item) => item[key]),
                    type: 'line'
                });
            })
            orderData.series = series;
            xOptions.xAxis.data = orderData.xData
            xOptions.series = orderData.series
            // line进行渲染
            let hEcharts = echarts.init(document.getElementById('chartLine'))
            hEcharts.setOption(xOptions)
            // bar进行渲染
            userData.xData = res.data.data.userData.map((item) => item.date);
            userData.series = [
                {
                    name: '新增用户',
                    data: res.data.data.userData.map((item) => item.new),
                    type: "bar"
                },
                {
                    name: '活跃用户',
                    data: res.data.data.userData.map((item) => item.active),
                    type: "bar"
                },
            ]
            xOptions.xAxis.data = userData.xData
            xOptions.series = userData.series
            let uEcharts = echarts.init(document.getElementById('chartBar'))
            uEcharts.setOption(xOptions)
            videoData.series = [
                {
                    data: res.data.data.videoData,
                    type: "pie",
                }
            ]
            pieOptions.series = videoData.series
            let vEcharts = echarts.init(document.getElementById('chartPie'))
            vEcharts.setOption(pieOptions)
        }
    });
}

onMounted(() => {
    getTableList();
    getCountList();
    getEchartsData()
});
</script>

<style lang="less" scoped>
.home {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            // border-radius: 50%;
            margin-right: 40px;
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
        width: 32%;
        margin-bottom: 20px;

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .details {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 30px;
                margin-bottom: 10px;
            }

            .txt {
                font-size: 14px;
                text-align: center;
                color: #999;
            }
        }
    }
}
.graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
        width: 48%;
    }
}
</style>

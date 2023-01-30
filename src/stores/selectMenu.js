import { defineStore } from 'pinia'
import Cookie from 'js-cookie'
export const useSelectMenuStore = defineStore('selectMenu', {
    state: () => ({
        menu: [],
        token: ''
    }),
    actions: {
        setMenu(val){
            this.menu = val
            localStorage.setItem('menu',JSON.stringify(val))
        },
        addMenu(router){
            if(!localStorage.getItem('menu')){
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'))
            this.menu = menu
            // console.log(menu)
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`
                        item.component = () => import(url)
                        return item
                    })  
                    menuArray.push(...item.children)
                }else{
                    let url = `../views/${item.url}.vue`
                    item.component = () => import(url)
                    menuArray.push(item)
                }
            });
            menuArray.forEach(item => {
                router.addRoute('home1',item)
            })
        },
        cleanMenu(){
            this.menu = [],
            localStorage.removeItem('menu')
        },
        setToken(val){
            this.token = val
            Cookie.set('token',val) 
        },
        clearToken(){
            this.token = '',
            Cookie.remove('token')
        },
        getToken(){
            this.token = this.token || Cookie.get('token')
        }
    }
})
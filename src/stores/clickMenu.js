import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => ({
        currentMenu: null
    }),
    actions: {
        selectMenu(item){
            //  判断
            item.name == 'home' ? (this.currentMenu = null) : (this.currentMenu = item)
        }
    }
})
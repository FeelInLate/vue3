import { defineStore } from 'pinia'

export const useCollapseStore = defineStore('collapse', {
    state: () => ({
        isCollapse: true,
    }),
    actions: {
        updateIsCollapse() {
            this.isCollapse = !this.isCollapse
        }
    }
})
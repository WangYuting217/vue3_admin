//小仓库：layout相关配置的仓库
import { defineStore } from 'pinia'
let useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,//用户控制菜单折叠还是收起的控制
            refresh:false,//仓库这个属性用于控制刷新效果
        }
    }
})
export default useLayOutSettingStore
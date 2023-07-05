import type { App, VNode } from 'vue'
/** 配置 */
interface ISkeletonOption {
     /** 指令名 */
     directiveName: string
     /** 行数 */
     rows: number
     /** 圆角 */
     radius: number
     /** 背景颜色 */
     bg: string
}
export default {
     install: (Vue: App, opts?: ISkeletonOption) => {
         // #38BB8F
         // #eaebed
         // #74CFB1
         opts ??= { directiveName: 'skeleton', rows: 5, radius: 5, bg: '#eaebed' }
         Vue.directive(opts?.directiveName, {
             updated(el: HTMLElement, binding, vnode) {
                 let { value } = binding
                 if (typeof value !== 'object') {
                     value = { loading: value }
                 }
                 // loading为true并且el的data-skeleton="0"或者空的时候画骨架
                 if (value.loading && (!el.dataset.skeleton || el.dataset.skeleton === '0')) {
                     el.dataset.skeleton = '1'
                     // el-table（自识别：宽度、列数、行高。可配置：行数、圆角、背景色）
                     if (el.classList.contains('el-table')) {
                         // 隐藏空数据提示
                         const totalWidth = el.clientWidth
                         const emptyText = el.querySelector('.el-table__empty-block') as HTMLElement
                         if (emptyText) {
                             emptyText.style.display = 'none'
                         }
 
                         // 计算每一列的宽度
                         const colsWidth = []
                         let usedWidth = 0
                         let freeCount = 0
                         /** vnode.children[0].children[0].children[0]  这个路径.... */
                         const [children] = (vnode.children as any)[0].children[0].children as VNode[]
                         /** 过滤出表头 */
                         const Columns = (children.children as VNode[]).filter((e: any) => e.type.name == 'ElTableColumn')
                         for (let i = 0; i < Columns.length; i++) {
                             const item = Columns[i] as any
                             colsWidth.push(item.component.propsOptions.width * 1)
                             if (item.component.propsOptions.width) {
                                 usedWidth += item.component.propsOptions.width * 1
                             } else {
                                 freeCount++
                             }
                         }
 
                         // 没指定宽度的列宽 = (总宽 - 已指定的列宽总和) / 未指定列宽的个数
                         const autoWidth = (totalWidth - usedWidth) / freeCount
                         for (let i = 0; i < colsWidth.length; i++) {
                             if (!colsWidth[i]) {
                                 colsWidth[i] = autoWidth
                             }
                         }
 
                         // 在tbody中画骨架
                         const tbody = el.querySelector('.el-table__body tbody')
                         if (tbody) {
                             // 行数（缺省为5）
                             const rows = value.rows || opts?.rows
                             // 骨架屏背景色（缺省为#eaebed）
                             const bg = value.bg || opts?.bg
                             // 圆角（缺省为5）
                             const radius = value.radius || opts?.radius
                            for (let i = 0; i < rows; i++) {
                                 const tr = document.createElement('tr')
                                 tr.className = 'skeleton-tr el-table__row is-animated'
                                 for (let j = 0; j < colsWidth.length; j++) {
                                     const td = document.createElement('td')
                                     td.className = 'cell'
                                     const div = document.createElement('div')
                                     div.style.lineHeight = '15px'
                                     div.style.margin = '8px 0'
                                     div.style.background = bg
                                     div.style.borderRadius = `${radius}px`
                                     div.style.textIndent = '-999px'
 
                                     /** 随机宽度*/
                                     div.style.width = `${Math.random() * 60 + 30}%`
 
                                     div.appendChild(document.createTextNode('.'))
                                     td.appendChild(div)
                                     tr.appendChild(td)
                                 }
                                 tbody.appendChild(tr)
                             }
                         }
                     }
                 } else if (!value.loading && el.dataset.skeleton === '1') {
                     // loading为false并且el的data-skeleton="1"的时候删除骨架
                     el.dataset.skeleton = '0'
 
                     // el-table
                     if (el.classList.contains('el-table')) {
                         const allSkeletons = el.querySelectorAll('.skeleton-tr')
                         const tbody = el.querySelector('.el-table__body tbody') as HTMLElement
                         for (let i = 0; i < allSkeletons.length; i++) {
                             tbody.removeChild(allSkeletons[i])
                         }
                         const emptyText = el.querySelector('.el-table__empty-block') as HTMLElement
                         if (emptyText) {
                             emptyText.style.display = 'block'
                         }
                     }
                 }
             }
         })
 
     }
 }
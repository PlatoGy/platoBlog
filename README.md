@@ -0,0 +1,286 @@
# platoBlog

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Plato's Blog 主要实现功能

1. 博客主页动画及内容展示
2. 博客主页天气功能
3. 博客知识库分类、标签分类组合查询
4. 自定义分页组件
5. 博客评论功能的实现-可使用emoji。
6. 博客流量统计及地理位置获取

### 使用技术

1.阅读量统计采用cookie判断是否阅读过

### 数据表设计

#### 1.知识库表Libraries

| 键名     | 解释                   |
| -------- | ---------------------- |
| id       | 编号                   |
| name     | 知识库名               |
| icon     | 标签图片               |
| count    | 在此知识库中的文章数目 |
| articles | 此知识库中的文章id     |

#### 2.标签表Labels

| 键名     | 解释                 |
| -------- | -------------------- |
| id       | 编号                 |
| name     | 标签名               |
| color    | 颜色                 |
| count    | 带有此标签的文章数目 |
| articles | 带有此标签的文章id   |

#### 3.文章表Article

| 键名        | 解释                             |
| ----------- | -------------------------------- |
| id          | 编号                             |
| title       | 文章标题                         |
| library     | 知识库名                         |
| libraryId   | 知识库Id                         |
| libraryIcon | 知识库图片                       |
| labels      | 标签，对象数组格式，字段同标签表 |
| publicTime  | 发布时间                         |
| updateTime  | 更新时间                         |
| read        | 阅读量（请求次数）               |
| commentNum  | 评论数目统计                     |
| comments    | 评论对象 数组                    |
| content     | md格式正文                       |
| commentable | 是否可评论                       |

#### 4.评论表Comment

| 字段          | 解释                                                                     |
| ------------- | ------------------------------------------------------------------------ |
| id            | 编号                                                                     |
| articleId     | 所属文章编号                                                             |
| masterId      | 所属顶级评论编号，若无，则为0                                            |
| parentId      | 父级评论号，若无父级评论，则为0                                          |
| parentInfo    | 父级评论信息，仅在parentId!=masterId的时候出现，包括父级评论的邮箱和内容 |
| content       | 评论内容                                                                 |
| mail          | 邮箱名                                                                   |
| reply         | 评论对象的数组，若无则为空                                               |
| time          | 时间                                                                     |
| country       | 国家                                                                     |
| province      | 省份                                                                     |
| city          | 城市                                                                     |
| commentAvatar | 评论使用的头像                                                           |

#### 5.用户cookies表

cookie规则：

若无cookie，则新建一个，并给一个过期时间，将文章号加入isRead，并在read表新建一条数据

若有cookie，判断是否过期

​	若已过期，同上新建

​	若未过期，则更新过期时间，判断是否在isRead中，若不在，则在read表新建；

​																							若在，则在read表中查询时间，若时间间隔超过1天，则新建一条记录



| 键名        | 解释                                   |
| ----------- | -------------------------------------- |
| id          | 序号                                   |
| cookie      | cookie                                 |
| expiredTime | 过期时间（每次请求接口时更新过期时间） |
| isRead      | 阅读过的文章                           |
| province    | 访问省份                               |
| city        | 访问城市                               |

### 6.阅读记录表ReadRecords

| 键名          | 解释       |
| ------------- | ---------- |
| id            | 序号       |
| cookie        | cookie     |
| readArticleId | 阅读文章号 |
| openTime      | 打开时间   |

### 接口设计

每次请求接口都需要更新cookie的expire时间，判断有无cookie/cookie是否过期，根据结果决定是否赋予新cookie

#### 1.根据ip判断登录位置，保存在vuex中



```json
{
    "code":200,
    "success":true,
    "data":{
        
    },
    "msg":成功
}
```



#### 2.获取libraries

/blog/getLibraries

```json
{
    "code":200,
    "success":true,
    "data":{
        
    },
    "msg":成功
}
```



#### 3.获取labels

/blog/getLabels



```json
{
    "code":200,
    "success":true,
    "data":{
        
    },
    "msg":成功
}
```



#### 4.获取文章列表（可查询）



```json
{
    "code":200,
    "success":true,
    "data":{
        
    },
    "msg":成功
}
```



#### 5.获取文章内容



```json
{
    "code":200,
    "success":true,
    "data":{
        
    },
    "msg":成功
}
```



#### 6.发表评论



```json
{
    "code":200,
    "success":true,
    "data":{
        
    },
    "msg":成功
}
```



#### 7.根据位置获取天气



```json
{
    "code":200,
    "success":true,
    "data":{
        
    },
    "msg":成功
}
```



#### 8.流量统计页面数据获取



```json
{
    "code":200,
    "success":true,
    "data":{
        
    },
    "msg":成功
}
```

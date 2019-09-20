基本用法

```vue
<template>
  <div>
    <d-form
      ref="dForm"
      :cliParams="cliParams"
      :formProps="formProps"
    ></d-form>
    <div>
      <el-button @click="getValues">获取提交的值</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getValues() {
      console.dir(this.$refs.dForm.flatFormValue)
      alert('请打开控制台查看')
    }
  },
  data() {
    return {
      formProps: {
        labelWidth: '150px',
      },
      cliParams: {
        "groupId": {
          "type": "input",
          "message": "请输入你的group id",
          "default": "com.deepexi",
          "required": true
        },
        "artifactId": {
          "type": "input",
          "message": "请输入你的artifact id",
          "default": "deepexi-dubbo"
        },
        "basePackage": {
          "type": "input",
          "message": "请输入你的基础包路径（为空则使用group id）"
        },
        "mavenUrl": {
          "type": "input",
          "message": "请输入你的maven仓库地址",
          "default": "http://nexus.deepexi.top/repository/maven-public/"
        },
        "discovery": {
          "type": "list",
          "choices": [
            "zookeeper",
            "nacos"
          ],
          "message": "请选择你使用的注册中心",
          "default": "zookeeper"
        },
        "converter": {
          "type": "list",
          "choices": [
            "mapstruct",
            "none"
          ],
          "message": "请选择你使用的对象映射类型",
          "default": "none"
        },
        "db": {
          "type": "list",
          "choices": [
            "xxx",
            "mysql",
            "none"
          ],
          "message": "请选择你使用的数据库",
          "default": "none",
          "child": {
            "dbPool": {
              "type": "list",
              "choices": [
                "druid",
                "default"
              ],
              "message": "请选择你使用的数据库连接池",
              "default": "none",
              "trigger": [
                {
                  "type": "anyAnswerTrigger",
                  "answer": "db",
                  "value": [
                    "mysql",
                    "mongo"
                  ]
                }
              ]
            },
            "orm": {
              "type": "list",
              "choices": [
                "mybatis-plus",
                "none"
              ],
              "message": "请选择你使用的ORM框架",
              "default": "none",
              "child": {
                "rrr": {
                  "type": "list",
                  "choices": [
                    "mybatis-plus",
                    "none"
                  ],
                  "message": "请选择你使用的ORM框架",
                  "default": "none",
                }
              }
            }
          }
        },
        "circuit": {
          "type": "list",
          "choices": [
            "hystrix",
            "none"
          ],
          "message": "请选择你使用的熔断器类型",
          "default": "none"
        },
        "mq": {
          "type": "list",
          "choices": [
            "rabbitmq",
            "none"
          ],
          "message": "请选择你使用的消息中间件类型",
          "default": "none"
        },
        "demo": {
          "type": "confirm",
          "tips": "是否为你生成相关的demo文件（默认No）",
          "default": false
        }
      }
    }
  }
}
</script>
```
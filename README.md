## chatGPT-api-proxy

- Node.js for the official ChatGPT API proxy.

- 将请求转发到官方的API地址，适用于无法配置proxy的情况。

- 采用post形式传参，除了```apiKey```必传，所有参数与官方一致，[详情](https://platform.openai.com/docs/api-reference/completions)。

### 接口说明

#### '/v1/completions'
- model默认为```text-davinci-003```，可传入model自定义。

| params                  | isNeed?  |
| ----------------------- | -------- |
| `apiKey`                | ✅ Yes   |
| `prompt`                | ✅ Yes   |


#### '/v1/chat/completions'
- model默认为```gpt-3.5-turbo```，可传入model自定义。

| params                  | isNeed?  |
| ----------------------- | -------- |
| `apiKey`                | ✅ Yes   |
| `messages`              | ✅ Yes   |


### 返回值说明

#### 成功示例

```JavaScript
{
  code: 200,
  data: {
    // openAi官方返回值
  }
}
```

#### 失败示例

```JavaScript
{
  code: 210,
  message: {
    // 报错信息
  }
}
```
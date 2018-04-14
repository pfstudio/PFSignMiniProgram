# 攀峰签到 —— 微信小程序

后台基于[PFSign](https://github.com/panfengstudio/PFSign)

clone后在当前目录下，复制以下两个文件，并去掉结尾的`.example`

- config.js.example
- project.config.json.example

并修改以下内容

- config.js

    `var host = 'https://domain';`

    此处将host修改为后台对应的域名
    亦可以在本地运行PFSign应用，填入`http://localhost`，并将微信开发工具的域名检验关闭即可

- project.config.json

    `{ "appid": "your appid", }`

    将此处的appid修改为你所申请的appid
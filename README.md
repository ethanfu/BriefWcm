#BriefWcm

## INSTALL
首先执行`rake db:create`,然后cd到项目么路目录执行`rails server`方法即可运行

## 开发说明
以注册用户来说明，首先执行生成controller的代码：`rails generate controller Users new --no-test-framework`，然后执行` rails generate integration_test user_pages`来生成单元测试代码，
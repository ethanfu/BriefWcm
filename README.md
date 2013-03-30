#BriefWcm

## INSTALL
首先执行`rake db:create`,然后cd到项目么路目录执行`rails server`方法即可运行


## 开发说明
以注册用户来说明，首先执行生成controller的代码：

	rails generate controller Users new --no-test-framework
然后生成模型，顺便生成相应的sql等

由于email是唯一，可以把email设置为主键：

	rails generate migration add_index_to_users_email
	bundle exec rake db:migrate
	
对密码加密

	rails generate migration add_password_digest_to_users password_digest:string
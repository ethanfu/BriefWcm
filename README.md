#BriefWcm

## INSTALL
首先执行`rake db:create`,然后cd到项目么路目录执行`rails server`方法即可运行


## 开发说明
以注册用户来说明，首先执行生成controller的代码：

	rails generate controller Users new --no-test-framework
## 然后生成模型，顺便生成相应的sql等

## 由于email是唯一，可以把email设置为主键：

	rails generate migration add_index_to_users_email
	bundle exec rake db:migrate
	
## 对密码加密

	rails generate migration add_password_digest_to_users password_digest:string
	
##使用上传图片插件paperclip步骤
	这里举例banner模型中的pic_url字段
	1.使用paperclip要安装ImageMagick，下载地址：http://www.imagemagick.org/script/download.php

	安装好后将安装路径加到开发环境config/environments/development.rb（项目中我添加的是我的安装路径，请自行替换）
	Paperclip.options[:command_path] = "C:\\ImageMagick-6.8.5-Q16"
	windows下不行可以试试：Paperclip.options[:image_magick_path] = "C:\\ImageMagick-6.8.5-Q16"
	
	2.在Gemfile文件中添加（项目中我已经添加）
		gem "paperclip", "~> 3.0"
	3.运行  bundle install
	4.在banner的模型中添加以下代码,具体配置切图配置和其他限制可参考网上
	has_attached_file :pic_url,
    :styles => {
      :thumb => "75x75#" ,
      :small => "100x100#" ,
      :medium => "150x150>"
    }
    5.运行rails generate paperclip banner pic_url
    	会生成一个添加数据库字段（存放上传的文件相关信息）的文件在db/migrate底下（项目中我已经生成了，此步可以跳过）
	注意字段名不能大写，只能是小写字母，下划线，数字组成
	6.运行rake db:migrate 更新数据库字段信息
	7.页面中的使用很简单，可以参考banner里的
	



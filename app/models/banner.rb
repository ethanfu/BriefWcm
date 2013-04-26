#encoding: utf-8
class Banner < ActiveRecord::Base
  
  attr_accessible :bdesc, :link_url, :pic_url, :title
  has_attached_file :pic_url,
    :styles => {
      :thumb => "75x75#",
      :small => "100x100#",
      :medium => "150x150>"
    },    
  :url => "/system/:attachment/:id/:style/:basename.:extension",    
  :path => ":rails_root/public/system/:attachment/:id/:style/:basename.:extension"
  ##上面代码中的参数url和path是Paperclip使用的默认值。url指定了相对于public的路径位置，
  ##其中有附件字段的名字（attachment）、模型的id和style替换占位符（placeholders）。
  ##path参数值中也有相似的替换占位符。如果想要将图片存储到assets目录中，我们只要改变url和path的值。
  ##:url => "/assets/products/:id/:style/:basename.:extension",    
  ##:path => ":rails_root/public/assets/products/:id/:style/:basename.:extension"
  
  ##验证附件
  validates_attachment_presence :pic_url , 
    :message => "不能为空"  #必填 
  validates_attachment_size :pic_url, :less_than => 5.megabytes, 
    :message => "不能超过5M" #5M   
  #文件类型
  validates_attachment_content_type :pic_url, :content_type => ['image/gif', 'image/png', 'image/x-png', 'image/jpeg', 'image/pjpeg', 'image/jpg'] , 
    :message => "只能上传jpg/jpeg/pjpeg/gif/png的图片"
    
end

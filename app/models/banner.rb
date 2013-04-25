class Banner < ActiveRecord::Base
  
  attr_accessible :bdesc, :link_url, :pic_url, :title
  has_attached_file :pic_url,
    :styles => {
      :thumb => "75x75#",
      :small => "100x100#",
      :medium => "150x150>"
    }
    
end

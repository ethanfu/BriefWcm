class Product < ActiveRecord::Base
  attr_accessible :deleteTag, :name, :parentId, :picPath, :productDesc
  validates :name, presence: true, length: {maximum: 50}
end

class CreateBanners < ActiveRecord::Migration
  def change
    create_table :banners do |t|
      t.string :title
      t.string :bDesc
      t.string :linkUrl
      t.string :picUrl

      t.timestamps
    end
  end
end

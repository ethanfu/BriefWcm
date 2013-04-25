class CreateBanners < ActiveRecord::Migration
  def change
    create_table :banners do |t|
      t.string :title
      t.string :bdesc
      t.string :link_url
      t.string :pic_url

      t.timestamps
    end
  end
end

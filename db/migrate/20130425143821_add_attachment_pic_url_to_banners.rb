class AddAttachmentPicUrlToBanners < ActiveRecord::Migration
  def self.up
    change_table :banners do |t|
      t.attachment :pic_url
    end
  end

  def self.down
    drop_attached_file :banners, :pic_url
  end
end

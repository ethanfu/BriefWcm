class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.integer :parentId
      t.string :picPath
      t.text :productDesc
      t.integer :deleteTag

      t.timestamps
    end
  end
end

require 'spec_helper'

describe "products/edit" do
  before(:each) do
    @product = assign(:product, stub_model(Product,
      :productId => 1,
      :name => "MyString",
      :parentId => 1,
      :picPath => "MyString",
      :productDesc => "MyText",
      :deleteTag => 1
    ))
  end

  it "renders the edit product form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => products_path(@product), :method => "post" do
      assert_select "input#product_productId", :name => "product[productId]"
      assert_select "input#product_name", :name => "product[name]"
      assert_select "input#product_parentId", :name => "product[parentId]"
      assert_select "input#product_picPath", :name => "product[picPath]"
      assert_select "textarea#product_productDesc", :name => "product[productDesc]"
      assert_select "input#product_deleteTag", :name => "product[deleteTag]"
    end
  end
end

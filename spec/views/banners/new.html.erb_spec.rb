require 'spec_helper'

describe "banners/new" do
  before(:each) do
    assign(:banner, stub_model(Banner,
      :title => "MyString",
      :bDesc => "MyString",
      :linkUrl => "MyString",
      :picUrl => "MyString"
    ).as_new_record)
  end

  it "renders new banner form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => banners_path, :method => "post" do
      assert_select "input#banner_title", :name => "banner[title]"
      assert_select "input#banner_bDesc", :name => "banner[bDesc]"
      assert_select "input#banner_linkUrl", :name => "banner[linkUrl]"
      assert_select "input#banner_picUrl", :name => "banner[picUrl]"
    end
  end
end

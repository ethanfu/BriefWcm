require 'spec_helper'

describe "banners/index" do
  before(:each) do
    assign(:banners, [
      stub_model(Banner,
        :title => "Title",
        :bDesc => "B Desc",
        :linkUrl => "Link Url",
        :picUrl => "Pic Url"
      ),
      stub_model(Banner,
        :title => "Title",
        :bDesc => "B Desc",
        :linkUrl => "Link Url",
        :picUrl => "Pic Url"
      )
    ])
  end

  it "renders a list of banners" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "B Desc".to_s, :count => 2
    assert_select "tr>td", :text => "Link Url".to_s, :count => 2
    assert_select "tr>td", :text => "Pic Url".to_s, :count => 2
  end
end

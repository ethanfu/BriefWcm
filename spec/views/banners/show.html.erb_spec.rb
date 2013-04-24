require 'spec_helper'

describe "banners/show" do
  before(:each) do
    @banner = assign(:banner, stub_model(Banner,
      :title => "Title",
      :bDesc => "B Desc",
      :linkUrl => "Link Url",
      :picUrl => "Pic Url"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Title/)
    rendered.should match(/B Desc/)
    rendered.should match(/Link Url/)
    rendered.should match(/Pic Url/)
  end
end

require 'spec_helper'

describe "products/show" do
  before(:each) do
    @product = assign(:product, stub_model(Product,
      :productId => 1,
      :name => "Name",
      :parentId => 2,
      :picPath => "Pic Path",
      :productDesc => "MyText",
      :deleteTag => 3
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/Name/)
    rendered.should match(/2/)
    rendered.should match(/Pic Path/)
    rendered.should match(/MyText/)
    rendered.should match(/3/)
  end
end

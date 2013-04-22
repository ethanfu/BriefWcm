class HomeController < ApplicationController
  def home
  end
  def product
    @products = Product.all

    respond_to do |format|
      format.html  #product.html.erb
      format.json { render json: @products }
    end
  end
  def device
  end
  def lab
  end
end

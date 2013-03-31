class UsersController < ApplicationController
  layout "admin"

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      # Handle a successful save.
      render 'sign_in'
    else
      render 'new'
    end
  end

  def sign_in
    @user = User.new
  end

  def authenticateUser
    user = User.find_by_email(params[:users][:email].downcase)
    if user && user.authenticate(params[:users][:password])
      redirect_to root_path
    else
      flash[:error] = 'Invalid email/password'
      render "sign_in"
    end

  end
end

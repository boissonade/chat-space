class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id]) #今いるグループの情報をパラムスの値を元にDBから取得。
    
    respond_to do |format|
      format.html
      format.json { @messages = @group.messages.where('id > ?', params[:last_id]) }
    end
  end
end
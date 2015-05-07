class SessionsController < ApplicationController
  before_action :set_session, only: [:show, :edit, :update, :destroy, :new_reservation, :create_reservation]

  # GET /sessions
  # GET /sessions.json
  def index
    @sessions = Session.all
  end

  # GET /sessions/1
  # GET /sessions/1.json
  def show
  end

  # GET /sessions/new
  def new
    @session = Session.new
  end

  # GET /sessions/1/edit
  def edit
  end

  # POST /sessions
  # POST /sessions.json
  def create
    @session = Session.new(session_params)

    respond_to do |format|
      if @session.save
        format.html { redirect_to @session, notice: 'Session was successfully created.' }
        format.json { render :show, status: :created, location: @session }
      else
        format.html { render :new }
        format.json { render json: @session.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sessions/1
  # PATCH/PUT /sessions/1.json
  def update
    respond_to do |format|
      if @session.update(session_params)
        format.html { redirect_to @session, notice: 'Session was successfully updated.' }
        format.json { render :show, status: :ok, location: @session }
      else
        format.html { render :edit }
        format.json { render json: @session.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def home
    render 'sessions/home'
  end
  
  def email
    render 'sessions/email_search'
  end
  
  def invalid_email
    puts "test2"
    @invalid = true;
    render 'sessions/email_search'
  end
  
  def filter
    date = params[:date]
    @sessions = Session.where(date: date)

    respond_to do |format|
      format.json { render json: @sessions }
    end
  end
  
  def email_search
      #take in email, search if it exists
      #if it does, show sessions ON or AFTER today
      #if not, yell at user
      
      user = User.where(email: params[:email]).first
      if user != nil
        @sessions = user.sessions.where("date >= ?", params[:date])
      else
        @session = []
        puts "test1"
      end
      
      respond_to do |format|
        format.json { render json: @sessions }
      end
  end
  
  def new_reservation
    this_session = Session.find(params[:id])
    @date = this_session.date
    @time = this_session.time
    
    render 'sessions/new_reservation'
  end
  
  def create_reservation
    user = User.find_or_initialize_by(email: params[:email])
    user.first = params[:first]
    user.last = params[:last]
    user.save
    
    reservation_check = Reservation.where(user_id: user.id, session_id: @session.id).first
    
    if reservation_check == nil
      reservation = Reservation.new(user_id: user.id, session_id: @session.id)
      reservation.save
    
      capacity = @session.current_capacity
      capacity += 1
      @session.update(current_capacity: capacity)
      
      @success = true;
      render 'sessions/home'
    else
      @error = 'This email is already registered for this session'
      
      @date = @session.date
      @time = @session.time
      render 'sessions/new_reservation'
    end
    
  end

  # DELETE /sessions/1
  # DELETE /sessions/1.json
  def destroy
    @session.destroy
    respond_to do |format|
      format.html { redirect_to sessions_url, notice: 'Session was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session
      @session = Session.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def session_params
      params.require(:session).permit(:date, :time, :current_capacity, :max_capacity)
    end
end

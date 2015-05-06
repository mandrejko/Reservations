class Session < ActiveRecord::Base
    has_many :users, :through => :reservations
    
    validates :date, presence: true
    validates :time, presence: true
    validates :current_capacity, presence: true
    validates :max_capacity, presence: true
end

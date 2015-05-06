class User < ActiveRecord::Base
    has_many :sessions, :through => :reservations
    has_many :reservations
    
    validates :first, presence: true
    validates :last, presence: true
    validates :email, presence: true, uniqueness: true
    # validates :password, presence: true, length: { minimum: 6 }
end
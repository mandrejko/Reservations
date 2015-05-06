class User < ActiveRecord::Base
    has_many :sessions, :through => :reservations
    
    validates :first, presence: true
    validates :last, presence: true
    validates :email, presence: true, uniqueness: true
    # validates :password, presence: true, length: { minimum: 6 }
end

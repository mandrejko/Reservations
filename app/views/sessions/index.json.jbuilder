json.array!(@sessions) do |session|
  json.extract! session, :id, :date, :current_capacity, :max_capacity
  json.url session_url(session, format: :json)
end

json.extract! user, :id, :username, :name, :github, :formation, :position, :created_at, :updated_at
json.url user_url(user, format: :json)

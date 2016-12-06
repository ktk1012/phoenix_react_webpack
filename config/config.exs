# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :phoenix_board,
  ecto_repos: [PhoenixBoard.Repo]

# Configures the endpoint
config :phoenix_board, PhoenixBoard.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "uXBPK7v6eVfsT5RopY7ruyCky7VVFrM4X6adxLi60h4nMp0Q3rLVn9bJmzjHZuxo",
  render_errors: [view: PhoenixBoard.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PhoenixBoard.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

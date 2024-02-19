## Why

色々なOpenTelemetry対応のオブザーバビリティバックエンドを触るにあたってクライアントになる分散Webサービスがほしくて作った。 <br>
トレースとログのみ対応。メトリクスはまだ。

名前が紛らわしいが、Next.jsのOpenTelemetry対応を試すためのリポジトリではない。@vercel/otelは使っていない。

## What

* ./frontend
  * Next.js
  * /でレンダリングされるページがサーバーサイドフェッチでbackendを叩く
* ./backend
  * Next.js（めんどくさかったので）
  * /animalsでデータベース上のanimalsを返す
* ./db
  * docker-composeでpostgresが立ち上がる。backendから叩かれる
* ./otel-collector
  * docker-composeでOpenTelemetry Collectorが立ち上がる。 frontend/backendのサーバー2つからOTLPを受ける
  * config.ymlなどを自由にさわって、試したいバックエンドを試す
    * exporterをいっぱい定義すれば色々なところに同時並行でおくれる
    * オブザーバビリティバックエンド次第ではDockerfileを変えないとダメ（イメージ指定があるとか）

## Getting Started

`pnpm install`とかは適宜

1. otel-collector/config.ymlをいじって好きなバックエンドに送る設定をする
   * otel-collector/.envファイルを作るとよい
1`docker-compose up -d`でOpenTelemetry CollectorとPostgresを立ち上げる
1. backendで`pnpm migrate`してPostgresにスキーマ適用する（申し訳ないが）
1. 適当な方法でPostgresにつないでanimalsテーブルに適当なレコードをつくる（申し訳ないが）
   * 接続文字列はbackend/.env参照
1. backend、frontendで`pnpm dev`
1. localhost:3000にアクセスすると画面にanimalsテーブルの内容が出る。オブザーバビリティバックエンドにトレースとログが送られていることを確認
    * うまくいかなければ一旦logging(debug)とかでCollector上でstdoutしてもいいかも

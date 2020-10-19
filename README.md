# line-cmd
LINEからSSH経由でコマンドを叩けます。

## 仕組み(How it works)
LINEでコマンドを叩く→LINE Messaging API→Webhook→SSHでシェルに接続→コマンド実行→結果取得→LINE Messaging APIでLINEに送信

## 機能(Features)
- LINEからリモートの操作が可能

## 注意点(Warning)
セキュリティについては懸念点があります。LINEボットを友達追加した人すべてがコマンドを使えてしまいますので、自己責任でどうぞ。

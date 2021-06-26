# Pheme GAS

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

[Pheme](https://github.com/eai04191/pheme) のデータを収集・集計する GAS API

## 使い方

1. [テンプレート](https://docs.google.com/spreadsheets/d/1jWpmHEowmYnkdjKht5iUzvoNYHiDwGHIE9Z37AsY74o/edit?usp=sharing)のコピーを作成する（ファイル → コピーを作成）
1. コピーのスクリプトを開く（ツール → スクリプトエディタ）
1. デプロイを作成する
   （デプロイを作成 → 以下の通り設定 → デプロイ）
   > - 種類を選択: ウェブアプリ
   > - 次のユーザーとして実行: 自分
   > - アクセスできるユーザー: 全員
2. デプロイのウェブアプリURLをPhemeのenv `ENDPOINT`に設定する

## 開発

1. `yarn clasp login` でログインする
1. https://script.google.com/home/usersettings で **Google Apps Script API** をオンにする
1. `.clasp.json.example`をコピーして`.clasp.json`を作る
1. がんばる

## tips

`push --watch`: で変更毎に自動で push できる

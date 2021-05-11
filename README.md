# Pheme

> ペーメー（古希: Φήμη, Phēmē）は、ギリシア神話の女神である。「噂 (fame)」や「名声」を人格化した女神で、よい噂を好み、悪い噂には憤る。

## Usage

### 依存関係のインストール

```
yarn
```

### 設定

```
cp .env.example .env
```

`.env`の`DISCORD_TOKEN=`に Bot の TOKEN を追記（[DEVELOPER PORTAL](https://discord.com/developers/applications/)→New Application→Bot→Add Bot で作成）

### 招待

`https://discordapp.com/oauth2/authorize?&client_id=アプリケーションのClient ID&scope=bot` を開いて bot をサーバーに招待する

アプリケーションの Client ID は、アプリケーション設定の OAuth2 ページに記載があります。

### 起動

```
yarn start
```

## LICENSE

MIT

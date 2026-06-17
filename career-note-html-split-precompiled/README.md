# キャリアノート HTML分割版

Notion上の1枚HTML版を、GitHub PagesへアップロードしやすいHTML分割構成にしたものです。

## 使い方

1. このフォルダの中身をGitHubリポジトリ直下へアップロードします。
2. GitHub Pagesでリポジトリ直下の `index.html` を公開します。
3. 既存URLを使う場合は、リポジトリ名とPages設定を変更しないでください。

## 注意

- React/Vite構成ではありません。
- `import/export` は使わず、`index.html` の `<script>` 読み込み順で動かします。
- 保存・復元・削除・初期化系の処理内容は変更せず、ファイル分割のみを目的にしています。
- 念のため、現在のHTML版をバックアップしてから置き換えてください。


## precompiled版について

この版は、ブラウザ上のBabel変換を使わない **事前変換済みHTML分割版** です。

- `@babel/standalone` は読み込みません。
- JSXは通常のJavaScriptへ変換済みです。
- コンソールに `Cannot use import statement outside a module` が出る場合は、このprecompiled版を使ってください。

ローカル確認は、ZIP展開後に以下で行います。

```bash
py -m http.server 8000
```

ブラウザでは以下を開きます。

```text
http://localhost:8000/
```

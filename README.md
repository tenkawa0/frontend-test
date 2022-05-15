# React + MSW + Storybook で始めるフロントエンドテストハンズオン

1. [はじめに](#intro)
1. [Integration Test を書く方法](#work)
   1. [画面の初期表示](#work1)
   1. [ユーザ操作の確認](#work2)
   1. [テストランナーの実行](#work3)

<a id="intro" ></a>

## はじめに

本ハンズオンでは、MSW + Storybook を使った Integration Test の書き方を解説します。<br />
Integration Test とは「コンポーネントを組み合わせて操作したときに想定した通りに動作するか」を確認するテストです。<br />
フロントエンドでは「システムが正しく動くことを保証できるテスト」を書くことが重要であり、これを達成するのには Integration Test が効果的と言われています。

> 詳しくは以下の記事がとても参考になります。<br /> https://qiita.com/noah-dev/items/3fd211deb8711fae8204

> 具体的にどんなことをテストするの？は以下の記事が参考になります。<br /> https://engineering.mercari.com/blog/entry/20211208-test-automation-policy-in-merpay-frontend/

<br />

<a id="work" ></a>

## Integration Test を書く方法

環境構築の方法は割愛。<br />
本リポジトリでは環境構築済みなので、`yarn && yarn storybook || npm install && npm run storybook` で Storybook を立ち上げてください。<br />

<br />

<a id="work1" ></a>

## 画面の初期表示

まずはじめに、API からデータを fetch する画面の表示パターンを確認します。<br />
API のモックは MSW を使用します。<br />

> MSW については以下の記事が参考になります。<br /> https://zenn.dev/takepepe/articles/msw-driven-development

`stories/work1/sample.stories.tsx`にサンプルを掲載しています。

- 画面の初期表示は fetch が成功・失敗したときの表示や、fetch 中の表示を確認します

<br />

<a id="work2" ></a>

### ユーザ操作の確認

次に、ユーザ操作のテストを作成します<br />
`stories/work2/sample.stories.tsx`にサンプルを掲載しています。

- Todo を追加する際の一連の操作を確認します
  - 余力がある人は、Todo を完了する際の操作も確認してみましょう
- Storybook の play function という機能を使用します
  - https://storybook.js.org/docs/react/writing-tests/interaction-testing
  - https://storybook.js.org/blog/interaction-testing-with-storybook/
- play function を使ってテストコードを作成するには`testing library`, `jest`, `WAI-ARIA`の知識が必要です

> WAI-ARIA については以下の動画が参考になります。<br /> https://www.youtube.com/watch?v=ZLL0_W5w1vo&t=782s

- `testing library`は priority guide を参照しましょう
  - https://testing-library.com/docs/queries/about#priority
- `await`しているのにテストが成功しないときは `waitFor` を使いましょう
  - https://testing-library.com/docs/dom-testing-library/api-async/#waitfor

<br />

<a id="work3" ></a>

### テストランナーの実行

最後に、テストランナーを実行してみましょう。<br />
`yran storybook`で Storybook を起動した状態で`yan test-storybook`を実行してみましょう。

> テストランナーについての詳細は以下の記事が参考になります<br /> https://storybook.js.org/blog/interaction-testing-with-storybook/

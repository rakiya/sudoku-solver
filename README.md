# 数独ソルバー

数独の問題を遺伝的アルゴリズムを使用して解く[^1]プログラムです。

## 実行方法

### コマンド

```sh
npm run solve <ファイル名>
```

### ファイルのフォーマット

数字と `-`を使って表します。
未記入のマスを `-` で表しています。

```text
8----51--
--1---8--
-4-2---9-
----3---2
1234-6789
6---1----
-8---9-5-
--2---4--
--76----1
```

[^1]: 井上はづき, et al. 遺伝的アルゴリズムによる数独の解法. 全国大会講演論文集, 2010, 人工知能と認知科学: 167-168.

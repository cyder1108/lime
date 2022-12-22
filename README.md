# 使い方

## 1. Node.jsのダウンロード・インストール
以下よりNode.jsのLTSをダウンロード・インストール（すでにインストール済みの場合は問題なし）

https://nodejs.org/ja/

## 2. sass / es の監視
### バッチファイルで行う場合
watch.batを右クリックして`管理者として実行`選択（以降sass/esフォルダ内のファイルを更新すると自動でトランスパイルされたソースがjs/css内に出力されます。）

コマンドプロンプト上で`Ctrl + C`で監視を終了します。

### CUI上で行う場合
1. プロジェクトフォルダのルートに移動
2. `npm install`を実行し関連ライブラリをダウンロード
3. `npm run watch`で監視開始


# CSS

## 基本指針
- サイトごとのユニークなクラスはComponentnsに追記していく
- 同じスタイルを持つクラスは極力作らない
- クラス名に見た目以外の深い意味をもたせない（x: userList / o: list01）
- 基本的にはキャメルケースを使用する
- 補助クラスは接頭辞にアンダースコア`_`

## 各ファイルごとの役割・規則

### Config
SCSS全体の変数を設定するファイル

- スタイルは記述しない

### Base
HTML要素のデフォルトスタイルを記述するファイル

- class/idセレクタは使用しない
- 子セレクタは使用しない

### Sizes
widthクラスやheightクラス等を記述するファイル

### Components
サイト内で主に使用するスタイルを記述するファイル

- LayoutやUtilitiesのclassを記述しない（子セレクタとしても）
- 子セレクタ以外で要素を指定しない
- 全てのコンポーネントクラスは末尾に01からナンバリング
- 親要素の幅に依存するようにするため固定幅のwidthは極力指定しない
- 子セレクタは特殊な事情を除き2階層まで

### Utilities
ユーティリティ系のスタイルを記述するファイル

- 子セレクタは使用しない

### Core - Layout
レイアウト用のスタイルを記述するファイル
基本的に各プロジェクトごとに変更はしない

- 視覚的なプロパティは使用しない（colorやborderなど）
- 絶対に他のclassと併用しない
- html上でdiv以外には指定しない

### Core - Mixins
- mixinを記述

### Core - Functions
- functionsを記述

--------------------------------------------------------------------

## Layout class
- [.blockCenter](#blockcenter)
- [.flex & .flexItem](#flex_flexitem)
- [.block](#block)
- [.stick](#stick)

※ [レスポンシブに対応する場合](#responsive)

<a id="blockcenter"></a>
### ◆ .blockCenter

block要素のセンタリングをするためのクラス  
- widthは別クラスで指定する

```css
.blockCenter {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
````

使用例
```html
<div class="blockCenter w-main"></div>
```

<a id="flex_flexitem"></a>
### ◆ .flex & .flexItem
flexとflex-itemのクラス
- デフォルトでは無間隔の縦並び
- 折り返しはしない

```scss
.flex {
  display: flex;
  flex-direction: column;
}

/*********************************
  .flex 補助クラス
*********************************/

// 並びの軸・方向
._direction-[ x / y / reverseX / reverseY ]

// 間隔
._gap
._gap-[ xxs / xs / s / m / l / xl / xxl / 0 ]

// 整列 - 横
._justifyContent-[ left / center / right ]

// 整列 - 縦
._alignItems-[ top / center / bottom / stretch ]
````

使用例
```html
<!-- PC:横並び / SP:縦並びの場合 -->
<div class="flex _direction-x _s_direction-y _gap-s">
  <div class="flexItem"></div>
  <div class="flexItem"></div>
</div>

/*********************************
  .flexItem 補助クラス
*********************************/
// 中身の幅に収縮
._fitContent
```

<a id="block"></a>
### ◆ .block
汎用的なブロック用クラス

```scss
.block {
  display: block;
}

/*********************************
  補助クラス
*********************************/

// padding
._padding
._padding-[ xxs / xs / s / m / l / xl / xxl / 0 ]
._padding[ T / L / R / B / H / V ]-[ xxs / xs / s / m / l / xl / xxl / 0 ]

// Margin
._margin
._margin-[ xxs / xs / s / m / l / xl / xxl / 0 ]
._margin[ T / L / R / B / H / V ]-[ xxs / xs / s / m / l / xl / xxl / 0 ]

// Negative Margin
._nMargin
._nMargin-[ xxs / xs / s / m / l / xl / xxl / 0 ]
._nMargin[ T / L / R / B / H / V ]-[ xxs / xs / s / m / l / xl / xxl / 0 ]

// Stick
._sticky { position: relative; }
````

使用例
```html
<div class="block _padding-s _s_padding-xs">
</div>
```

<a id="stick"></a>
### ◆ .stick

```scss
.stick {
  position: absolute;
}

/*********************************
  補助クラス
*********************************/
._top
._left
._right
._bottom
._horizontal
._vertical
._parent
._inset[ T / L / R / B / H / V / Parent ]-[ xxs / xs / s / m / l / xl / xxl / 0 ]
._offset[ T / L / R / B / H / V / Parent ]-[ xxs / xs / s / m / l / xl / xxl / 0 ]
```

使用例
```html
<div class="block sticky" id="modalWindow">
  <a class="stick _insetTop-s _insetRight-s">閉じる</a>
</div>
```
<a id="responsive"></a>
### ※ レスポンシブに対応する場合
レスポンシブに対応する場合、補助クラスの頭に` _s / _m / _l `とブレークポイントサイズを加えます 
各ブレークポイントの幅は`_config.scss`内の`$bp-widths`で指定します

例えば以下の場合ブレークポイントS以下のpaddingが0になります
```html
<div class="block _padding _s_padding-0"></div>
```

.flexでブレークポイントSを超える場合は横並び、S以下の時に縦並びにしたい場合は以下のように記述します
```html
<div class="flex _gap-s _direction-x _s_direction-y">
  <div class="flexItem"></div>
  <div class="flexItem"></div>
  <div class="flexItem"></div>
</div>
```
また、自作classにブレークポイントによってスタイルを加えたい場合は、以下のように`bp-[ s / m / l ]-or-lower`のmixinが使用できます
```scss
.container {
  padding: 20px;
  
  /* ブレークポイントS以下に加えるスタイル */
  @include bp-s-or-lower {
    padding: 10px;
  }
}
```


## Utilitiesデフォルトclass
```scss
/*********************************
  テキスト系
*********************************/
.fs-[ xxs / xs / s / m / l / xl / xxl ] // font-size
.[ s / m / l  ]_fs-[ xxs / xs / s / m / l / xl / xxl ] // レスポンシブ用

.align-[ left / center / right ]
.[ s / m / l  ]_align-[ left / center / right ] // レスポンシブ用

.bold
.monospace // 等幅フォント
.underline
.bracket
.ul
.ol
.kome
.antialias

/*********************************
  位置系
*********************************/
.position-[ static/ relative / absolute ]
.[ s / m / l  ]_position-[ static/ relative / absolute ] // レスポンシブ用

.float-[ left / right / none ]
.[ s / m / l  ]_float-[ left / right / none ] // レスポンシブ用

/*********************************
  表示系
*********************************/
.display-[ block / inlineBlock / inline ]
.[ s / m / l  ]_display-[ block / inlineBlock / inline ] // レスポンシブ用

.invisible // display none
.[ s / m / l  ]_invisible // レスポンシブ用

.visible // display block
.[ s / m / l  ]_visible // レスポンシブ用

.op-[ 0 ～ 10 ] // opacity

.sandbox // overflow hidden

/*********************************
  色系
*********************************/
.color-[ main / accent / link / white / black / info / success / caution / danger ]
.bg-[ main / accent / link / white / black / info / success / caution / danger ]
.monochrome

/*********************************
  その他
*********************************/
.cf // clearfix

.ignorePointerEvents // pointer-events none
.[ s / m / l  ]_ignorePointerEvents
```

## mixinなど

```scss

// アスペクト比固定用スタイル呼び出し
@include aspect( 16, 9 );

// グラデーション
@include gradient( 90deg, black, #333 );
@include gradient( 180deg, #fafafa, #ffffff, #000 );

// 縦グラデーション
@include gradient-v( black, white )

// 横グラデーション
@include gradient-h( black, white )

// ストライプ（等幅）
@include stripe( 45deg, 20px, white, aqua ) // 角度, 間隔, 色1, 色2

// 縦ストライプ（等幅）
@include stripe-v( 20px, white, aqua )

// 横ストライプ（等幅）
@include stripe-h( 20px, white, aqua )

// メッシュ
@include mesh( 90deg, 5px, 10px, black, white ) // 角度, 線幅, 間隔, 線色, 背景色

```

/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  // プラグインの設定
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  // インポートの順序設定
  importOrder: [
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '^(expo(.*)$)|^(expo$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@acm/(.*)$',
    '^acm/(.*)$',
    '^@/',
    '^~/',
    '^[../]',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',

  // コードスタイルの設定
  // アロー関数の括弧を常に付ける
  arrowParens: 'always',
  // 行の最大文字数
  printWidth: 100,
  // シングルクォートを使用
  singleQuote: true,
  // セミコロンを使用
  semi: false,
  // 末尾のカンマを常に付ける
  trailingComma: 'none',
  // インデントのスペース数
  tabWidth: 2,
  // マークダウンの折り返し
  proseWrap: 'always'
}

export default config

/** @type {import("eslint").Linter.Config} */
const config = {
  // TypeScriptのパーサーを指定
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // TypeScriptのプロジェクト設定を使用
    project: './tsconfig.json'
  },
  // TypeScript ESLintプラグインを使用
  plugins: ['@typescript-eslint'],
  // 基本設定
  extends: [
    // Expoの推奨設定
    'expo',
    // ESLintの推奨設定
    'eslint:recommended',
    // TypeScriptの型チェックを含む推奨設定
    'plugin:@typescript-eslint/recommended-type-checked',
    // TypeScriptのスタイルに関する推奨設定
    'plugin:@typescript-eslint/stylistic-type-checked',
    // Prettierとの競合を解決
    'prettier'
  ],
  rules: {
    // ============================================
    // コードの一貫性に関する設定
    // ============================================
    // console.log等の使用を許可
    'no-console': ['off'],
    // 標準の未使用変数チェックを無効化（TypeScriptのルールを使用）
    'no-unused-vars': 'off',
    // TypeScript用の未使用変数チェック（_始まりの変数は無視）
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // ============================================
    // import
    // ============================================
    // 重複したインポートを禁止
    'import/no-duplicates': 'error',

    // ============================================
    // Reactのベストプラクティス
    // ============================================
    // Hooksのルールを強制
    'react-hooks/rules-of-hooks': 'error',
    // useEffect等の依存配列チェック
    'react-hooks/exhaustive-deps': 'off',
    // PropTypesチェックを無効化（TypeScriptを使用するため）
    'react/prop-types': 'off',
    // React 17以降はimport React不要
    'react/react-in-jsx-scope': 'off',
    // 空要素は自己終了タグを使用
    'react/self-closing-comp': 'error',

    // ============================================
    // TypeScript固有の設定
    // ============================================
    // interfaceよりもtypeを優先して使用可能に
    '@typescript-eslint/consistent-type-definitions': 'off',
    // 型のインポートスタイルを統一
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports'
      }
    ],
    // async関数内でawaitが必須という制約を解除
    '@typescript-eslint/require-await': 'off',
    // Promiseの誤用を防ぐ
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: { attributes: false }
      }
    ],
    // require文の使用を許可
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off'
  },
  // ESLintのチェック対象から除外するファイル
  ignorePatterns: ['babel.config.js']
}

module.exports = config

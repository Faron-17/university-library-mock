![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.24-4B5563?style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/ReactHookForm-7.54-EF4444?style=for-the-badge&logo=reacthookform&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5.0--beta-000000?style=for-the-badge)
![Drizzle ORM](https://img.shields.io/badge/Drizzle--ORM-0.40-8B5CF6?style=for-the-badge)
![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-1.34-00DC82?style=for-the-badge&logo=redis&logoColor=white)
![Upstash Ratelimit](https://img.shields.io/badge/Upstash_Ratelimit-2.0-00DC82?style=for-the-badge)
![Neon Database](https://img.shields.io/badge/NeonDB-0.10-1E90FF?style=for-the-badge)
![ImageKit](https://img.shields.io/badge/ImageKit-6.0-7F1D1D?style=for-the-badge)
# 大学図書システムのデモページ
![](./ホーム画面.png)
***
JavaScript MasteryというYouTubeチャンネルの[大学図書システムを作るハンズオン動画](https://youtu.be/EZajJGOMWas?si=rauY9DAFv9N9BIAu)を見ながら作成しました。imagekitというサービスを用いて画像をクラウドに保存したり、認証のほか、neon dbに本の情報を追加（seed, migration）をしたりしました。

## デモページ

https://university-library-mock.vercel.app/

### デモ用認証情報
メールアドレス：testuser@gml.com
<br />
パスワード：testuser


## 機能一覧
- 認証（/sign-in, /sign-up）
  - ログイン
  - ログアウト
  - 新規登録
- 図書詳細ページ（/books/{id}）

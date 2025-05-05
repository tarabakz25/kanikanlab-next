import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 pt-40 pb-20">
      <h1 className="text-3xl font-bold mb-4">プライバシーポリシー</h1>
      <p className="text-sm text-gray-600 mb-6">公開日: 2025年2月28日</p>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. はじめに</h2>
        <p className="mb-4">
          当ブログサイト（以下「当サイト」といいます）は、利用者の皆様（以下「ユーザー」といいます）の個人情報の保護を重要視しています。本プライバシーポリシーは、当サイトが収集・利用する個人情報の種類、利用目的、管理方法などについて説明するものです。ユーザーが当サイトを利用される際には、本プライバシーポリシーに同意いただいたものとみなします。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. 収集する個人情報について</h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">2.1 収集する情報の種類</h3>
          <p className="mb-2">当サイトでは、以下の情報を収集する場合があります。</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-1">
              <strong>アクセスログ</strong>
              <p>ブラウザの種類、IPアドレス、閲覧日時、参照元URL、閲覧ページなどの技術情報</p>
            </li>
            <li className="mb-1">
              <strong>Cookieや類似の技術</strong>
              <p>ユーザーの利便性向上やアクセス解析のために使用</p>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">2.2 個人情報以外の情報</h3>
          <p>利用状況の統計情報など、個人が特定できない情報も収集する場合があります。</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. 個人情報の利用目的</h2>
        <p className="mb-2">当サイトは、収集した個人情報を以下の目的で利用します。</p>
        <ul className="list-disc pl-6">
          <li>サイトの改善、新サービスの開発およびマーケティングのための分析</li>
          <li>サイトの安全性やセキュリティの向上のためのモニタリングおよび分析</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. 個人情報の第三者提供について</h2>
        <p className="mb-2">当サイトは、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。</p>
        <ul className="list-disc pl-6">
          <li>法令に基づく場合</li>
          <li>人の生命、身体または財産の保護のために必要な場合で、本人の同意が得られない場合</li>
          <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要な場合で、本人の同意が得られない場合</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. 個人情報の管理</h2>
        <p>当サイトは、ユーザーの個人情報を正確かつ最新の状態に保つとともに、不正アクセス、紛失、破壊、改ざんおよび漏洩等のリスクに対して適切な安全管理措置を講じます。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Cookieおよび類似技術について</h2>
        <p>当サイトでは、利用者の利便性向上やアクセス解析のためにCookieおよび類似技術を使用しています。ユーザーは、ブラウザの設定によりCookieの受け入れを拒否することが可能ですが、その場合、一部のサービスがご利用いただけない可能性があります。</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Googleアナリティクスの利用について</h2>
        <p className="mb-4">当サイトでは、ウェブサイトの利用状況を分析するためにGoogleが提供するアクセス解析ツール「Googleアナリティクス」を使用しています。</p>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">7.1 収集される情報</h3>
          <p className="mb-2">Googleアナリティクスは、Cookieを使用して以下のような情報を収集します。</p>
          <ul className="list-disc pl-6 mb-2">
            <li>訪問者のIPアドレス（匿名化処理されます）</li>
            <li>ブラウザの種類、デバイス情報</li>
            <li>閲覧したページ、滞在時間</li>
            <li>リファラー（どこから当サイトへ訪れたか）</li>
            <li>地理的な位置情報</li>
          </ul>
          <p>これらの情報は個人を特定するものではなく、統計的な分析のために使用されます。</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">7.2 収集された情報の利用目的</h3>
          <p className="mb-2">当サイトは、Googleアナリティクスを通じて収集した情報を以下の目的で利用します。</p>
          <ul className="list-disc pl-6">
            <li>ウェブサイトのコンテンツ改善</li>
            <li>ユーザーエクスペリエンスの向上</li>
            <li>マーケティング活動の効果測定</li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. 外部サイトへのリンク</h2>
        <p className="mb-4">当サイトには、外部サイトへのリンクが含まれる場合があります。これらのリンクは、ユーザーの利便性向上や追加情報の提供を目的として設置されています。</p>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">8.1 リンク先サイトの責任</h3>
          <p>リンク先のサイトにおける個人情報の取り扱いについては、各サイトのプライバシーポリシーをご確認ください。当サイトは、リンク先サイトの内容、プライバシーポリシーやデータ収集慣行に関して一切の責任を負いません。</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">8.2 リンク先の選定</h3>
          <p>当サイトは、リンク先サイトを慎重に選定するよう努めていますが、外部サイトの内容や安全性を完全に保証するものではありません。ユーザーは自己責任においてリンク先サイトをご利用ください。</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. プライバシーポリシーの変更について</h2>
        <p>当サイトは、本プライバシーポリシーの内容を予告なく変更することがあります。変更後のポリシーは、当サイトに掲載された時点で効力を生じるものとします。ユーザーは定期的に本ページをご確認いただくようお願いいたします。</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
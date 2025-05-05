import React from 'react';

const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 pt-40 pb-55">
      <h1 className="text-3xl font-bold mb-4">免責事項</h1>
      <p className="text-sm text-gray-600 mb-6">公開日: 2025年2月28日</p>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">情報の正確性について</h2>
        <p className="mb-4">
          KanikanLabサイト（以下「当サイト」）に掲載されている情報は、可能な限り正確な情報を提供するよう努めていますが、その完全性、正確性、最新性、有用性等についていかなる保証もするものではありません。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">損害賠償について</h2>
        <p className="mb-4">
          当サイトの情報を用いて行う行為に関連して生じたあらゆる損害等について、KanikanLabは一切の責任を負いません。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">外部リンクについて</h2>
        <p className="mb-4">
          当サイトからリンクされている外部サイトの内容については、KanikanLabは一切の責任を負いません。リンク先のサイトの利用については、ユーザー自身の責任で行ってください。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">コンテンツの著作権</h2>
        <p className="mb-4">
          当サイトに掲載されているコンテンツ（文章、画像、動画等）の著作権は、KanikanLabまたは原著作者に帰属します。無断での複製、転載は禁止します。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">免責事項の変更</h2>
        <p className="mb-4">
          本免責事項は、予告なく変更される場合があります。変更後の免責事項は、当サイトに掲載された時点から効力を生じるものとします。
        </p>
      </section>
    </div>
  );
};

export default Disclaimer;


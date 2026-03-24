import Link from "next/link";

const features = [
  {
    icon: "✍️",
    title: "상품 설명 자동 생성",
    desc: "상품명과 특징만 입력하면 전환율 높은 설명이 자동으로 완성됩니다.",
  },
  {
    icon: "🔍",
    title: "SEO 최적화",
    desc: "검색 노출에 최적화된 제목과 키워드를 자동으로 추천합니다.",
  },
  {
    icon: "📊",
    title: "경쟁 분석",
    desc: "같은 카테고리 인기 상품의 설명 패턴을 분석해 반영합니다.",
  },
  {
    icon: "⭐",
    title: "리뷰 요약",
    desc: "고객 리뷰를 분석해 어필 포인트를 상품 설명에 녹여냅니다.",
  },
];

const platforms = [
  { name: "네이버 스마트스토어", icon: "🟢", color: "bg-green-50 border-green-200" },
  { name: "쿠팡", icon: "🔴", color: "bg-red-50 border-red-200" },
  { name: "11번가", icon: "🟠", color: "bg-orange-50 border-orange-200" },
];

const plans = [
  {
    name: "무료",
    price: "0",
    period: "원/월",
    desc: "시작하기 좋은 플랜",
    features: ["월 5개 생성", "기본 SEO 최적화", "1개 플랫폼"],
    cta: "무료로 시작",
    highlight: false,
  },
  {
    name: "Pro",
    price: "79,000",
    period: "원/월",
    desc: "성장하는 셀러를 위한 플랜",
    features: ["월 100개 생성", "고급 SEO 최적화", "모든 플랫폼", "경쟁 분석", "톤/길이 커스터마이징"],
    cta: "Pro 시작하기",
    highlight: true,
  },
  {
    name: "Business",
    price: "149,000",
    period: "원/월",
    desc: "대량 판매자를 위한 플랜",
    features: ["무제한 생성", "프리미엄 SEO", "모든 플랫폼", "경쟁 분석 + 리뷰 요약", "API 액세스", "전담 지원"],
    cta: "Business 시작",
    highlight: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNDUsMTU4LDExLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span>🚀</span> 스마트스토어 판매자 필수 도구
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              상품 설명,<br />
              <span className="text-amber-500">AI가 대신 써드립니다</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              상품명과 특징만 입력하면 SEO 최적화된 상품 설명이 자동으로 완성됩니다.
              스마트스토어, 쿠팡, 11번가 모두 지원.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/generate"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
              >
                지금 바로 생성하기 →
              </Link>
              <Link
                href="/pricing"
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all border border-gray-200"
              >
                가격 보기
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">신용카드 없이 무료로 시작 • 월 5개까지 무료</p>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-500 text-sm ml-2">ShopAI 상품 설명 생성기</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">상품명</p>
                  <p className="text-white text-sm">프리미엄 실크 파자마 세트</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">카테고리</p>
                  <p className="text-white text-sm">의류</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">핵심 특징</p>
                  <p className="text-white text-sm">100% 실크 · 사계절용 · 고급 포장</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-amber-400 text-xs mb-2 font-medium">✨ AI 생성 결과</p>
                <p className="text-green-400 text-xs mb-1">&lt;title&gt;</p>
                <p className="text-white text-sm mb-3">[오늘만 특가] 프리미엄 100% 실크 파자마 세트 | 사계절 착용 가능</p>
                <p className="text-green-400 text-xs mb-1">&lt;description&gt;</p>
                <p className="text-gray-300 text-xs leading-relaxed">
                  잠자리가 달라지는 경험, 프리미엄 실크 파자마로 시작하세요.
                  100% 천연 실크 소재로 피부 자극 없이 편안한 수면을...
                </p>
                <p className="text-green-400 text-xs mt-3 mb-1">&lt;keywords&gt;</p>
                <p className="text-amber-300 text-xs">#실크파자마 #프리미엄잠옷 #커플파자마 #선물추천</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 ShopAI인가요?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              상품 설명 하나로 매출이 달라집니다. AI가 데이터 기반으로 최적의 설명을 만들어드립니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              주요 플랫폼 모두 지원
            </h2>
            <p className="text-gray-600 text-lg">각 플랫폼에 최적화된 형식으로 생성됩니다.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map((p) => (
              <div
                key={p.name}
                className={`flex items-center gap-3 px-8 py-5 rounded-xl border-2 ${p.color} min-w-[200px] justify-center`}
              >
                <span className="text-2xl">{p.icon}</span>
                <span className="font-semibold text-gray-800">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              합리적인 가격
            </h2>
            <p className="text-gray-600 text-lg">무료로 시작하고, 필요할 때 업그레이드하세요.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlight
                    ? "bg-amber-500 text-white shadow-xl shadow-amber-500/25 scale-105"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <h3 className={`text-lg font-semibold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-amber-100" : "text-gray-500"}`}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-amber-100" : "text-gray-500"}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span>{plan.highlight ? "✅" : "✓"}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/generate"
                  className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.highlight
                      ? "bg-white text-amber-600 hover:bg-amber-50"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            상품 설명 고민은 이제 그만. AI가 매출을 올려드립니다.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-amber-50 transition-colors shadow-lg"
          >
            무료로 상품 설명 생성하기 →
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

const plans = [
  {
    name: "무료",
    price: "0",
    period: "원/월",
    desc: "시작하기 좋은 플랜",
    features: [
      "월 5개 상품 설명 생성",
      "기본 SEO 최적화",
      "1개 플랫폼 지원",
      "기본 톤 설정",
    ],
    notIncluded: ["경쟁 분석", "리뷰 요약", "API 액세스"],
    cta: "무료로 시작하기",
    highlight: false,
  },
  {
    name: "Pro",
    price: "79,000",
    period: "원/월",
    desc: "성장하는 셀러를 위한 플랜",
    badge: "인기",
    features: [
      "월 100개 상품 설명 생성",
      "고급 SEO 최적화",
      "모든 플랫폼 지원",
      "경쟁 분석",
      "톤/길이 커스터마이징",
      "HTML 내보내기",
    ],
    notIncluded: ["API 액세스"],
    cta: "Pro 시작하기",
    highlight: true,
  },
  {
    name: "Business",
    price: "149,000",
    period: "원/월",
    desc: "대량 판매자를 위한 플랜",
    features: [
      "무제한 상품 설명 생성",
      "프리미엄 SEO 최적화",
      "모든 플랫폼 지원",
      "경쟁 분석 + 리뷰 요약",
      "API 액세스",
      "전담 지원",
      "대량 생성 기능",
      "우선 처리",
    ],
    notIncluded: [],
    cta: "Business 시작하기",
    highlight: false,
  },
];

const faqs = [
  {
    q: "무료 플랜은 정말 무료인가요?",
    a: "네, 신용카드 없이 바로 시작할 수 있습니다. 월 5개까지 상품 설명을 무료로 생성할 수 있습니다.",
  },
  {
    q: "어떤 플랫폼을 지원하나요?",
    a: "네이버 스마트스토어, 쿠팡, 11번가를 지원합니다. 각 플랫폼에 최적화된 형식으로 생성됩니다.",
  },
  {
    q: "생성된 설명의 품질은 어떤가요?",
    a: "최신 AI 모델을 활용하여 SEO 최적화된 고품질 상품 설명을 생성합니다. 카테고리별 베스트셀러 패턴을 학습했습니다.",
  },
  {
    q: "플랜을 언제든 변경할 수 있나요?",
    a: "네, 언제든 업그레이드 또는 다운그레이드가 가능합니다. 변경 즉시 적용됩니다.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            합리적인 <span className="text-amber-500">가격</span>
          </h1>
          <p className="text-lg text-gray-600">
            무료로 시작하고, 비즈니스가 성장하면 업그레이드하세요.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 -mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.highlight
                    ? "bg-amber-500 text-white shadow-xl shadow-amber-500/25 md:scale-105"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-800 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.highlight ? "text-amber-100" : "text-gray-500"
                  }`}
                >
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span
                    className={`text-5xl font-bold ${
                      plan.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlight ? "text-amber-100" : "text-gray-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Included */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5">
                        {plan.highlight ? "✅" : "✅"}
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-sm ${
                        plan.highlight ? "text-amber-200/60" : "text-gray-400"
                      }`}
                    >
                      <span className="mt-0.5">—</span>
                      <span className="line-through">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/generate"
                  className={`block text-center py-3.5 rounded-xl font-semibold transition-colors ${
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

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="border border-gray-200 rounded-xl p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            무료 플랜으로 바로 체험해보세요. 신용카드 필요 없습니다.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-amber-50 transition-colors shadow-lg"
          >
            무료로 시작하기 →
          </Link>
        </div>
      </section>
    </div>
  );
}

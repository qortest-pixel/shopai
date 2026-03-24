"use client";

import { useState } from "react";

interface GenerateResult {
  title: string;
  description: string;
  keywords: string[];
  tips: string[];
}

const categories = ["의류", "식품", "뷰티", "전자", "생활"];
const tones = [
  { value: "professional", label: "전문적" },
  { value: "friendly", label: "친근한" },
  { value: "emotional", label: "감성적" },
];
const lengths = [
  { value: "short", label: "짧은" },
  { value: "medium", label: "중간" },
  { value: "long", label: "긴" },
];
const platformOptions = [
  { value: "smartstore", label: "스마트스토어" },
  { value: "coupang", label: "쿠팡" },
];

export default function GeneratePage() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("의류");
  const [features, setFeatures] = useState(["", "", ""]);
  const [target, setTarget] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [platform, setPlatform] = useState("smartstore");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          category,
          features: features.filter((f) => f.trim()),
          target,
          tone,
          length,
          platform,
        }),
      });

      if (!res.ok) {
        throw new Error("생성에 실패했습니다. 다시 시도해주세요.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const downloadAsText = () => {
    if (!result) return;
    const content = `상품 제목:\n${result.title}\n\n상품 설명:\n${result.description}\n\n키워드:\n${result.keywords.join(", ")}\n\n검색 노출 팁:\n${result.tips.join("\n")}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${productName || "상품설명"}_shopai.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            🛒 상품 설명 <span className="text-amber-500">자동 생성</span>
          </h1>
          <p className="text-gray-600">상품 정보를 입력하면 AI가 팔리는 설명을 만들어드립니다.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">상품 정보 입력</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  상품명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="예: 프리미엄 실크 파자마 세트"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        category === c
                          ? "bg-amber-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  핵심 특징 (최대 3개)
                </label>
                {features.map((f, i) => (
                  <input
                    key={i}
                    type="text"
                    value={f}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    placeholder={`특징 ${i + 1}`}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm mb-2"
                  />
                ))}
              </div>

              {/* Target */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">타겟 고객</label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="예: 20-30대 여성, 선물 구매자"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>

              {/* Options Row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">톤</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                  >
                    {tones.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">길이</label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                  >
                    {lengths.map((l) => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">플랫폼</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                  >
                    {platformOptions.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !productName.trim()}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-lg font-semibold transition-colors text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    AI가 생성 중...
                  </span>
                ) : (
                  "✨ 상품 설명 생성하기"
                )}
              </button>
            </form>
          </div>

          {/* Result */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">생성 결과</h2>
              {result && (
                <button
                  onClick={downloadAsText}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                >
                  📥 다운로드
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {!result && !error && !loading && (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <span className="text-5xl mb-4">🛍️</span>
                <p className="text-sm">상품 정보를 입력하고 생성 버튼을 눌러주세요</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <div className="animate-bounce text-5xl mb-4">✨</div>
                <p className="text-sm">AI가 최적의 상품 설명을 만들고 있습니다...</p>
              </div>
            )}

            {result && (
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">SEO 상품 제목</span>
                    <button
                      onClick={() => copyToClipboard(result.title, "title")}
                      className="text-xs text-gray-500 hover:text-amber-600"
                    >
                      {copied === "title" ? "✅ 복사됨" : "📋 복사"}
                    </button>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-gray-900 font-medium">{result.title}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">상품 설명</span>
                    <button
                      onClick={() => copyToClipboard(result.description, "desc")}
                      className="text-xs text-gray-500 hover:text-amber-600"
                    >
                      {copied === "desc" ? "✅ 복사됨" : "📋 복사"}
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[200px] overflow-y-auto">
                    <div
                      className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: result.description }}
                    />
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">키워드 태그</span>
                    <button
                      onClick={() => copyToClipboard(result.keywords.join(" "), "keywords")}
                      className="text-xs text-gray-500 hover:text-amber-600"
                    >
                      {copied === "keywords" ? "✅ 복사됨" : "📋 복사"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <span className="text-xs font-medium text-amber-600 uppercase tracking-wider block mb-2">
                    검색 노출 팁
                  </span>
                  <ul className="space-y-1.5">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

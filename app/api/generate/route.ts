import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

function getToken(): string {
  try {
    const secretsPath = join(
      process.env.HOME || "/Users/baegchang-u",
      ".openclaw",
      "secrets.json"
    );
    const secrets = JSON.parse(readFileSync(secretsPath, "utf-8"));
    return secrets?.openclaw?.gatewayAuthToken || "";
  } catch {
    return "";
  }
}

const toneMap: Record<string, string> = {
  professional: "전문적이고 신뢰감 있는",
  friendly: "친근하고 대화하는 듯한",
  emotional: "감성적이고 스토리텔링 중심의",
};

const lengthMap: Record<string, string> = {
  short: "3-5줄 이내의 간결한",
  medium: "8-12줄의 적당한",
  long: "15-20줄의 상세한",
};

const platformMap: Record<string, string> = {
  smartstore: "네이버 스마트스토어",
  coupang: "쿠팡",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productName, category, features, target, tone, length, platform } =
      body;

    if (!productName) {
      return NextResponse.json(
        { error: "상품명은 필수입니다." },
        { status: 400 }
      );
    }

    const token = getToken();
    if (!token) {
      return NextResponse.json(
        { error: "인증 토큰을 찾을 수 없습니다." },
        { status: 500 }
      );
    }

    const prompt = `당신은 한국 이커머스 상품 설명 전문가입니다. 아래 정보를 바탕으로 ${platformMap[platform] || "스마트스토어"}에 최적화된 상품 설명을 생성해주세요.

상품명: ${productName}
카테고리: ${category}
핵심 특징: ${(features as string[]).join(", ")}
타겟 고객: ${target || "일반 소비자"}
톤: ${toneMap[tone] || "전문적인"} 톤
길이: ${lengthMap[length] || "적당한"} 길이

다음 JSON 형식으로 정확히 응답해주세요 (다른 텍스트 없이 JSON만):
{
  "title": "SEO 최적화된 상품 제목 (50자 이내, 핵심 키워드 포함)",
  "description": "HTML 형식의 상품 설명 (p, strong, ul, li 태그 사용 가능)",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"],
  "tips": ["검색 노출 팁 1", "검색 노출 팁 2", "검색 노출 팁 3"]
}`;

    const response = await fetch("http://127.0.0.1:18789/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: "openclaw:executor",
        messages: [
          {
            role: "system",
            content:
              "당신은 한국 이커머스 상품 설명 전문가입니다. 항상 유효한 JSON으로만 응답하세요.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gateway error:", errText);
      return NextResponse.json(
        { error: "AI 서비스 호출에 실패했습니다." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse JSON from response (handle markdown code blocks)
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found");
      }
    } catch {
      // Fallback
      parsed = {
        title: `${productName} - 최고의 선택`,
        description: `<p>${productName}을(를) 소개합니다. ${(features as string[]).join(", ")} 등의 특징을 갖춘 제품입니다.</p>`,
        keywords: [productName, category, ...(features as string[]).slice(0, 3)],
        tips: [
          "상품명에 핵심 키워드를 포함하세요",
          "상품 설명 첫 2줄에 핵심 정보를 넣으세요",
          "고객 리뷰 키워드를 설명에 반영하세요",
        ],
      };
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

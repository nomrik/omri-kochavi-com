import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

async function loadInter() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Inter:wght@700&text=OK"
  ).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) {
    throw new Error("Could not find Inter font URL");
  }

  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export default async function Icon() {
  const inter = await loadInter();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f59e0b",
          color: "#000000",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "Inter",
          letterSpacing: "-0.02em",
        }}
      >
        OK
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: inter,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

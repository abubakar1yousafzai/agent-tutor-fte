import React from "react";

// Minimal, dependency-free markdown renderer for chapter content.
// Handles: # / ## / ### / #### headings, **bold**, *italic*, `code`,
// fenced ``` code blocks, --- rules, "-"/"*" bullet lists, "1." ordered lists,
// and paragraphs. Good enough for the seeded chapter markdown.

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (token.startsWith("**")) {
      nodes.push(<strong key={key} className="font-semibold text-ink">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key} className="rounded bg-surfaceAlt px-1.5 py-0.5 font-mono text-[0.85em] text-primaryDeep">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(<em key={key} className="italic">{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    if (line.trim().startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(
        <pre key={key++} className="my-4 overflow-x-auto rounded-xl border border-line bg-surfaceAlt p-4 text-[12.5px] leading-relaxed">
          <code className="font-mono text-inkSoft">{code.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(<hr key={key++} className="my-6 border-line" />);
      i++;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2];
      const cls =
        level === 1
          ? "mt-2 mb-4 font-serif text-3xl text-ink"
          : level === 2
          ? "mt-7 mb-3 text-xl font-bold text-ink"
          : level === 3
          ? "mt-5 mb-2 text-base font-bold text-ink"
          : "mt-4 mb-2 text-sm font-semibold uppercase tracking-wide text-inkSoft";
      const Tag = (`h${level}` as keyof JSX.IntrinsicElements);
      blocks.push(
        <Tag key={key++} className={cls}>
          {renderInline(text, `h${key}`)}
        </Tag>
      );
      i++;
      continue;
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-3 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-inkSoft">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ul${key}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-3 list-decimal space-y-1.5 pl-5 text-[14px] leading-relaxed text-inkSoft">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ol${key}-${idx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // paragraph (gather until blank / block start)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,4})\s/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("```") &&
      !/^(-{3,}|\*{3,})$/.test(lines[i].trim())
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-3 text-[14px] leading-relaxed text-inkSoft">
        {renderInline(para.join(" "), `p${key}`)}
      </p>
    );
  }

  return <div>{blocks}</div>;
}

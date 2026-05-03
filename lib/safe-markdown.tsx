import type { ReactElement, ReactNode } from "react";

/**
 * A deliberately tiny markdown renderer for the final memo. Accepts only a
 * narrow subset (H2/H3 headings, paragraphs, bold, italic, inline code) and
 * passes everything else through React as plain text — there is no HTML
 * escape hatch and no link/image/raw-HTML support, so authored markdown
 * cannot inject script or style nodes.
 */

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "paragraph"; text: string };

const HEADING_CLASSES = {
  h2: "text-foreground mb-3 text-2xl leading-tight font-semibold tracking-tight first:mt-0",
  h3: "text-foreground mt-6 mb-2 text-xl leading-snug font-semibold tracking-tight first:mt-0",
};

export function SafeMarkdown({ source, className }: { source: string; className?: string }) {
  const blocks = parseBlocks(source);
  return <div className={className}>{blocks.map((block, index) => renderBlock(block, index))}</div>;
}

function renderBlock(block: Block, key: number): ReactElement {
  if (block.kind === "h2") {
    return (
      <h2 key={key} className={HEADING_CLASSES.h2}>
        {renderInline(block.text)}
      </h2>
    );
  }
  if (block.kind === "h3") {
    return (
      <h3 key={key} className={HEADING_CLASSES.h3}>
        {renderInline(block.text)}
      </h3>
    );
  }
  return (
    <p key={key} className="text-foreground mt-3 text-[0.95rem] leading-relaxed first:mt-0">
      {renderInline(block.text)}
    </p>
  );
}

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let buffer: string[] = [];

  const flushParagraph = () => {
    if (buffer.length === 0) return;
    const text = buffer.join(" ").trim();
    if (text.length > 0) blocks.push({ kind: "paragraph", text });
    buffer = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (line.length === 0) {
      flushParagraph();
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push({ kind: "h2", text: line.slice(3).trim() });
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      blocks.push({ kind: "h3", text: line.slice(4).trim() });
      continue;
    }
    buffer.push(line);
  }
  flushParagraph();
  return blocks;
}

const TOKEN_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

function renderInline(text: string): ReactNode[] {
  const parts = text.split(TOKEN_PATTERN).filter((part) => part !== "");
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

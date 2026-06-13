// Sample content for the Legacy Learning vision loop.
// Everything here is MOCKED / deterministic — clearly a working concept, never a live API call.

export type TargetId = "handwriting" | "worksheet" | "object" | "flashcard";
export type GlyphKind = "word" | "math" | "object" | "sight";

export interface ScanSample {
  id: string;
  /** Big caption shown on the sample card + its button. */
  label: string;
  /** Small descriptor under the caption. */
  sub: string;
  kind: GlyphKind;
  /** What the (mock) Vision pass "extracted". */
  saw: string;
  /** 1–5 */
  stars: number;
  /** Encouraging coaching line shown in the result panel. */
  coaching: string;
  /** Visual accent for object cards. */
  art?: "apple" | "ball" | "leaf";
}

export interface WriteTarget {
  prompt: string;
  /** The glyph/word the learner is forming (also used as the trace guide). */
  glyph: string;
  recognized: string;
  confidence: number;
  coaching: string;
  strokeHint: string;
}

export interface TargetConfig {
  id: TargetId;
  label: string;
  tag: string;
  lessonKind: string;
  /** Ordered lesson steps for the adaptive rail. */
  lesson: string[];
  write: WriteTarget;
  samples: ScanSample[];
}

export const TARGETS: TargetConfig[] = [
  {
    id: "handwriting",
    label: "Handwriting",
    tag: "Letters & first words",
    lessonKind: "Letters A–E",
    lesson: ["A", "B", "C", "D", "E"],
    write: {
      prompt: "Trace the letter B",
      glyph: "B",
      recognized: "B",
      confidence: 95,
      coaching: "Great start — you wrote B, 95% match. Try a bigger bottom loop.",
      strokeHint: "Down the stem, then two bumps.",
    },
    samples: [
      {
        id: "cat",
        label: "cat",
        sub: "child's handwriting · lined paper",
        kind: "word",
        saw: "cat",
        stars: 5,
        coaching: "I see cat — all three letters, nicely spaced. 5-star word!",
      },
      {
        id: "sun",
        label: "sun",
        sub: "lowercase · lined paper",
        kind: "word",
        saw: "sun",
        stars: 4,
        coaching: "I see sun — clear letters! Let's keep the n sitting on the line.",
      },
      {
        id: "dog",
        label: "dog",
        sub: "child's handwriting · lined paper",
        kind: "word",
        saw: "dog",
        stars: 4,
        coaching: "I see dog — lovely round d. Give the g tail a little more curl.",
      },
    ],
  },
  {
    id: "worksheet",
    label: "Worksheet",
    tag: "Early math",
    lessonKind: "Numbers 1–5",
    lesson: ["1", "2", "3", "4", "5"],
    write: {
      prompt: "Form the number 3",
      glyph: "3",
      recognized: "3",
      confidence: 93,
      coaching: "That's a 3 — watch the top curve; let's trace it together.",
      strokeHint: "Round the top, then round the bottom.",
    },
    samples: [
      {
        id: "add",
        label: "2 + 3 = 5",
        sub: "addition · grid paper",
        kind: "math",
        saw: "2 + 3 = 5",
        stars: 5,
        coaching: "Nice — 2 + 3 = 5 is correct! Neat, even numbers.",
      },
      {
        id: "sub",
        label: "4 − 1 = 3",
        sub: "subtraction · grid paper",
        kind: "math",
        saw: "4 − 1 = 3",
        stars: 4,
        coaching: "I see 4 − 1 = 3 — spot on! Keep the minus sign nice and flat.",
      },
    ],
  },
  {
    id: "object",
    label: "Object",
    tag: "Show & name",
    lessonKind: "Objects A–E",
    lesson: ["apple", "ball", "cup", "dog", "egg"],
    write: {
      prompt: "Write the word: apple",
      glyph: "apple",
      recognized: "apple",
      confidence: 92,
      coaching: "Great — you wrote apple, 92% match. Lovely round a!",
      strokeHint: "Each letter touches the line.",
    },
    samples: [
      {
        id: "apple",
        label: "apple",
        sub: "flashcard · object photo",
        kind: "object",
        art: "apple",
        saw: "an apple",
        stars: 5,
        coaching: "I see an apple — red, round and ripe! Can you say /a/ for apple?",
      },
      {
        id: "ball",
        label: "ball",
        sub: "flashcard · object photo",
        kind: "object",
        art: "ball",
        saw: "a ball",
        stars: 4,
        coaching: "I see a ball — bright and round! Bounce it: /b/ /b/ ball.",
      },
    ],
  },
  {
    id: "flashcard",
    label: "Flashcard",
    tag: "Sight words",
    lessonKind: "Sight words",
    lesson: ["the", "and", "you", "see", "like"],
    write: {
      prompt: "Write the sight word: the",
      glyph: "the",
      recognized: "the",
      confidence: 94,
      coaching: "Great — you wrote the, 94% match. Keep the letters touching the line.",
      strokeHint: "Join t–h–e in one smooth flow.",
    },
    samples: [
      {
        id: "the",
        label: "the",
        sub: "sight-word card",
        kind: "sight",
        saw: "the",
        stars: 5,
        coaching: "I see the — read it in a snap! That's a 5-star sight word.",
      },
      {
        id: "and",
        label: "and",
        sub: "sight-word card",
        kind: "sight",
        saw: "and",
        stars: 4,
        coaching: "I see and — nicely read! Trace it once more to make it automatic.",
      },
    ],
  },
];

export function getTarget(id: TargetId): TargetConfig {
  return TARGETS.find((t) => t.id === id) ?? TARGETS[0];
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

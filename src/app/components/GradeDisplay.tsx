interface GradeDisplayProps {
  grade: string;
  score: string;
  detail: string;
  showMascot?: boolean;
}

export function GradeDisplay({ grade, score, detail, showMascot }: GradeDisplayProps) {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-center gap-4 border-2 border-gray-300 relative">
      <div className="text-center">
        <div className="text-xs text-gray-600 mb-1">{score}</div>
        <div className="text-5xl text-blue-600">{grade}</div>
        <div className="text-xs text-gray-600 mt-1">{detail}</div>
      </div>
      {showMascot && (
        <div className="text-4xl">🎓</div>
      )}
    </div>
  );
}

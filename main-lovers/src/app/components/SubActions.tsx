import Link from "next/link";

export default function SubAction() {
  return (
    <button className="btn btn-outline btn-secondary">
      <Link href="/subscription">GO PREMIUM ⭐️</Link>
    </button>
  );
}

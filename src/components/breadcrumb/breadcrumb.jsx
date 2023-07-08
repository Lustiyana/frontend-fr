import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();
  const path = pathname.split("/");
  return (
    <div className="flex gap-2">
      {path.map((p, index) => {
        if (p === "") {
          return (
            <div key={p}>
              <Link
                href="/dashboard"
                key="home"
                className="font-bold text-blue-700"
              >
                home
              </Link>
            </div>
          );
        } else {
          const isLast = index === path.length - 1;
          return (
            <>
              <div key={`separator-${index}`}>/</div>
              {isLast ? (
                <div className="font-bold" key={p}>
                  {p}
                </div>
              ) : (
                <Link href={`/${p}`} key={p}>
                  <div className="font-bold text-blue-700">{p}</div>
                </Link>
              )}
            </>
          );
        }
      })}
    </div>
  );
}

import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="bg-brand-navy-dark py-7 px-16 flex justify-between items-center">
      <Link href="/" className="font-dm text-[17px] font-extrabold text-brand-blue">
        shokulab
      </Link>
      <p className="text-white/30 text-xs">
        © {new Date().getFullYear()} shokulab / 株式会社職人さんドットコム
      </p>
    </footer>
  )
}

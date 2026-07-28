// Footer (§5): brand + tagline, contact details, links. One consistent contact set (§9).
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";
import { ClockIcon, MapPinIcon, PhoneIcon } from "./icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-background">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Image src={logo} alt="" className="h-10 w-10" />
              <span className="font-semibold text-foreground">{site.name}</span>
            </div>
            {/* Gold used sparingly for the tagline only (§4). */}
            <p className="font-medium text-gold">{site.tagline}</p>
            <p className="max-w-xs text-sm text-muted">{site.positioning}</p>
          </div>

          {/* Contact */}
          <div className="space-y-3 text-sm">
            <h2 className="font-medium text-foreground">Reach us</h2>
            <div className="flex flex-col gap-2">
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-2 font-medium text-primary tabular-nums hover:text-foreground"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {p.label}
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="break-all text-muted hover:text-primary"
              >
                {site.email}
              </a>
              <span className="inline-flex items-start gap-2 text-muted">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {site.address.full}
              </span>
              <span className="inline-flex items-center gap-2 text-muted">
                <ClockIcon className="h-4 w-4 text-primary" />
                {site.hours}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3 text-sm">
            <h2 className="font-medium text-foreground">Explore</h2>
            <nav className="flex flex-col gap-2" aria-label="Footer">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.cac} · NHIS/HMO accepted
          </p>
          <p>
            &copy; {year} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}

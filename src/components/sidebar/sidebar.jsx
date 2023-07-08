import Link from "next/link";
import { usePathname } from "next/navigation";
import Router from "next/router";
import nookies from "nookies";

export default function Sidebar() {
  const currentUrl = usePathname();
  return (
    <div className="px-6 border bg-white h-screen">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary drawer-button lg:hidden"
      >
        Open drawer
      </label>

      <div className="flex items-center gap-4">
        <img src="/assets/pendis-kemenag.png" alt="" />
        <div className="w-24 font-bold">PENDIS KEMENAG</div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="font-bold text-sm">MAIN MENU</div>
          <Link href="/dashboard">
            <div className="flex gap-2 px-8 py-2 w-64 bg-[#F1F1F2] rounded-lg">
              <img src="/assets/home.svg" alt="" />
              <div className="font-semibold">Dashboard</div>
            </div>
          </Link>
        </div>

        <div>
          <div className="font-bold text-sm">KONTEN</div>
          <div>
            <div className="collapse collapse-arrow w-64 rounded-lg">
              <input type="checkbox" className="peer" />
              <div className="collapse-title flex items-center gap-2 px-8 py-2 rounded-lg">
                <img src="/assets/file-text.svg" alt="" />
                <div className="font-semibold">Artikel</div>
              </div>
              <div className="collapse-content">
                <ul>
                  <li>
                    <Link href="/artikel/berita">
                      <div className="flex gap-2 px-8 py-2 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Berita</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/artikel/pengumuman">
                      <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Pengumuman</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/artikel/buletin">
                      <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Buletin</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/artikel/kolom-opini">
                      <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Kolom Opini</div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="collapse collapse-arrow w-64 rounded-lg">
              <input type="checkbox" className="peer" />
              <div className="collapse-title flex items-center gap-2 px-8 py-2 rounded-lg">
                <img src="/assets/file.svg" alt="" />
                <div className="font-semibold">Pages</div>
              </div>
              <div className="collapse-content">
                <ul>
                  <li>
                    <Link href="/pages/unit-kerja">
                      <div className="flex gap-2 px-8 py-2 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Unit Kerja</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/layanan">
                      <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Layanan</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/data">
                      <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Data</div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="collapse collapse-arrow w-64 rounded-lg">
              <input type="checkbox" className="peer" />
              <div className="collapse-title flex items-center gap-2 px-8 py-2 rounded-lg">
                <img src="/assets/layout-grid.svg" alt="" />
                <div className="font-semibold">Galeri</div>
              </div>
              <div className="collapse-content">
                <ul>
                  <li>
                    <Link href="/gallery/video">
                      <div className="flex gap-2 px-8 py-2 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Video</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery/photo">
                      <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Gambar</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                      <img src="/assets/point.svg" alt="" />
                      <div className="font-semibold">Data Manager</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="collapse collapse-arrow w-64 rounded-lg">
              <input type="checkbox" className="peer" />
              <div className="collapse-title flex items-center gap-2 px-8 py-2 rounded-lg">
                <img src="/assets/color-swatch.svg" alt="" />
                <div className="font-semibold">Arsip</div>
              </div>
              <div className="collapse-content">
                <ul>
                  <li>
                    <Link href="/arsip/publikasi">
                      <div className="flex gap-2 px-8 py-2 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Publikasi</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/arsip/regulasi">
                      <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Regulasi</div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="collapse collapse-arrow w-64 rounded-lg">
              <input type="checkbox" className="peer" />
              <div className="collapse-title flex items-center gap-2 px-8 py-2 rounded-lg">
                <img src="/assets/text-wrap.svg" alt="" />
                <div className="font-semibold">Profil</div>
              </div>
              <div className="collapse-content">
                <ul>
                  <li>
                    <Link href="/profile/profile">
                      <div className="flex gap-2 px-8 py-2 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Semua Profil</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/category">
                      <div className="flex gap-2 px-8 py-2 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Kategori</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/organization-structure">
                      <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                        <img src="/assets/point.svg" alt="" />
                        <div className="font-semibold">Struktur Organisasi</div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/banner">
              <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                <img src="/assets/layout-navbar.svg" alt="" />
                <div className="font-semibold">Banner & Infografis</div>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div className="font-bold text-sm">MANAJEMEN PENGGUNA</div>
          <div>
            <Link href="/author">
              <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                <img src="/assets/users.svg" alt="" />
                <div className="font-semibold">Author</div>
              </div>
            </Link>
            <Link href="/admin">
              <div className="flex gap-2 px-8 py-2 w-64 rounded-lg">
                <img src="/assets/users.svg" alt="" />
                <div className="font-semibold">Admin</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

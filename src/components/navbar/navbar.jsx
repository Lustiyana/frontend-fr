import Router from "next/router";
import nookies from "nookies";

export default function Navbar() {
  function logout() {
    nookies.destroy(null, "token");
    Router.replace("/login");
  }
  return (
    <div className="w-full bg-white">
      <div className="flex justify-end">
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1">
            Hover
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

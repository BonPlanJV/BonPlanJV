import { useLocation } from "@solidjs/router";
import { useWindowScrollPosition } from "@solid-primitives/scroll";
import banner from '~/assets/Banner.png'

export default function Nav() {
  const location = useLocation();
  const headerActive = () => useWindowScrollPosition().y > 10 ? "backdrop-blur-xl backdrop-brightness-50 backdrop-contrast-125" : "bg-transparent"
  const active = (path) =>
    path == location.pathname
      ? "border-neutral-200"
      : "border-transparent hover:border-sky-600";
  return (
    <header class="sticky z-10 top-0">
      <nav class={`absolute w-full ${headerActive()}`}>
      <ul class="container flex w-full items-center p-7 text-gray-200">
        <a href="/"><img src={banner} class="h-[50px]" /></a>
        <div class="flex w-full justify-center">
        <li class={`border-b-2 ${active("/hot")} mx-1.5 sm:mx-6`}>
          <a href="/hot">Tendances</a>
        </li>
        <li class={`border-b-2 ${active("/new")} mx-1.5 sm:mx-6`}>
          <a href="/new">Nouveautés</a>
        </li>
        <li class={`border-b-2 ${active("/commented")} mx-1.5 sm:mx-6`}>
          <a href="/commented">Commentés</a>
        </li>
        <li class={`border-b-2 ${active("/favorite")} mx-1.5 sm:mx-6`}>
          <a href="/favorite">Favoris</a>
        </li>
        </div>
        <div class="flex absolute right-0">
          <li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
          <a href="/login">Login</a>
        </li>
        <li class={`border-b-2 ${active("/register")} mx-1.5 sm:mx-6`}>
          <a href="/register">Register</a>
        </li>
        </div>
      </ul>
    </nav>
    </header>
  );
}

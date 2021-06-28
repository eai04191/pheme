import clsx from "clsx";

export const Footer: React.VFC = () => {
  return (
    <div className="bg-gray-800 text-gray-100">
      <div className="flex items-center  max-w-7xl mx-auto justify-between py-7 px-4">
        <div className="">Pheme is open source software.</div>
        <div className="gap-2 grid">
          <a href="https://github.com/eai04191/pheme">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://s2.svgbox.net/octicons.svg?ic=mark-github-bold&color=gray-100"
              alt="GitHub"
              width="24"
              height="24"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

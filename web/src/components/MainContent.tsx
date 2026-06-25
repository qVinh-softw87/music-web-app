"use client";

import { usePlayer } from "@/context/PlayerContext";
import { SongList } from "./SongList";

export function MainContent() {
  return (
    <section
      className="min-w-0 bg-[#121212] rounded-lg flex-1 min-h-0 flex flex-col section1"
      style={{ flex: "6 1 0%" }}
    >
      <div className="py-4 header-sticky relative">
        <div className="ml-9 flex gap-3">
          <a
            href="#"
            className="px-4 py-2 rounded-full text-sm font-thin text-white bg-[#2a2a2a] hover:scale-105 transition"
          >
            All
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-full text-sm font-thin text-white bg-[#2a2a2a] hover:scale-105 transition"
          >
            Music
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-full text-sm font-thin text-white bg-[#2a2a2a] hover:scale-105 transition"
          >
            Podcasts
          </a>
        </div>
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        <SongList />
        <section className="mt-10 mx-10">
          <a
            href="#"
            className="text-white text-2xl font-extrabold tracking-tight hover:underline underline-offset-4"
          >
            Made For You
          </a>
          <div className="mt-4 flex gap-6 overflow-y-auto hide-scrollbar">
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item2.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Your shortcut to hidden gems, deep cuts and more
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item3.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                ANH TRAI "SAY HI"
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item4.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                BUI TRUONG LINH
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item5.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                girl in red, Liana Flores
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item7.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Luke Chian, Regular Song
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item8.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                SON TUNG MTP, Break up in happy
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/items1.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Discipline, No love no problems
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/pexels-alyona-nagel-1468385055-35224893.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Road to internship, not road to love
              </p>
            </a>
          </div>
        </section>
        <section className="mt-10 mx-10">
          <a
            href="#"
            className="text-white text-2xl font-extrabold tracking-tight hover:underline underline-offset-4"
          >
            Recently Played
          </a>
          <div className="mt-4 flex gap-6 overflow-y-auto hide-scrollbar">
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item2.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                I'm in love
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item3.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                No love, no problems
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item4.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                HongKong 1
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item5.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Pin dự phòng
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item7.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Dành cho anh
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item8.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Buông đôi tay nhau ra
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/items1.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Discipline
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/pexels-alyona-nagel-1468385055-35224893.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Road to internship, not road to love
              </p>
            </a>
          </div>
        </section>
        <section className="mt-10 mx-10">
          <a
            href="#"
            className="text-white text-2xl font-extrabold tracking-tight hover:underline underline-offset-4"
          >
            Episodes you might like
          </a>
          <div className="mt-4 flex gap-6 overflow-y-auto hide-scrollbar">
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item2.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Những người "kén chọn" trong tình yêu
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item3.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                QUẢ CAM THỨ 2| Cuộc gặp gỡ cuối cùng
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item4.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                How to make every day so fun
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item5.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                English podcast for Beginner| Your hobby
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item7.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Football - The king of sport
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item8.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                The weather today
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/items1.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Discipline, No love no problems
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/pexels-alyona-nagel-1468385055-35224893.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Road to internship, not road to love
              </p>
            </a>
          </div>
        </section>
        <section className="mt-10 mx-10">
          <a
            href="#"
            className="text-white text-2xl font-extrabold tracking-tight hover:underline underline-offset-4"
          >
            Popular albums and singles
          </a>
          <div className="mt-4 flex gap-6 overflow-y-auto hide-scrollbar">
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item2.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Đánh đổi
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item3.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Nắng có mang em về
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item4.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Tháng tư là lời nói dối của anh
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item5.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Có mình và ta
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item7.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Ngày đẹp trời để nói chia tay
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/item8.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                No love, no problems
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/items1.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Discipline
              </p>
            </a>
            <a
              href="#"
              className="group flex flex-col gap-2 w-[160px] transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[#181818] transition-all duration-300 ease-out group-hover:brightness-110">
                <img
                  src="/image/pexels-alyona-nagel-1468385055-35224893.jpg"
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#b3b3b3] text-sm leading-snug transition-colors duration-200 group-hover:text-white truncate">
                Road to internship, not road to love
              </p>
            </a>
          </div>
        </section>
        <footer className="mt-24 px-10 pb-20 text-sm text-neutral-400">
          <div className="border-t border-neutral-800 mb-16" />
          <div className="flex justify-between gap-x-16">
            <div className="grid grid-cols-4 gap-x-16 items-start">
              <div>
                <h3 className="text-white font-semibold mb-4 whitespace-nowrap min-h-[20px]">
                  Company
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Jobs
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    For the Record
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4 whitespace-nowrap min-h-[20px]">
                  Communities
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    For Artists
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Developers
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Advertising
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Investors
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Vendors
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4 whitespace-nowrap min-h-[20px]">
                  Useful links
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Support
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Free Mobile App
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Popular by Country
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Import your music
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4 whitespace-nowrap min-h-[20px]">
                  Spotify Plans
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Premium Individual
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Premium Student
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    Spotify Free
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <svg
                  className="w-5 h-5 shrink-0 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm6-1.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <svg
                  className="w-5 h-5 shrink-0 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 5.9c-.8.4-1.6.6-2.5.7a4.3 4.3 0 001.9-2.4 8.6 8.6 0 01-2.7 1 4.3 4.3 0 00-7.4 3 4 4 0 00.1 1A12.2 12.2 0 013 4.8a4.3 4.3 0 001.3 5.7c-.6 0-1.2-.2-1.7-.4v.1a4.3 4.3 0 003.4 4.2c-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1a4.3 4.3 0 004 3 8.7 8.7 0 01-5.3 1.8A9 9 0 012 19a12.2 12.2 0 006.6 1.9c7.9 0 12.2-6.6 12.2-12.2v-.6A8.4 8.4 0 0022 5.9z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <svg
                  className="w-5 h-5 shrink-0 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-2.9h2V9.6c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.4h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-16 mb-6" />
          <div className="flex justify-between flex-wrap gap-y-4">
            <div className="flex gap-x-6 gap-y-2 flex-wrap">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                Legal
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                Safety & Privacy Center
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                Cookies
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                About Ads
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                Accessibility
              </a>
            </div>
            <span className="text-neutral-500">© 2026 Spotify AB</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

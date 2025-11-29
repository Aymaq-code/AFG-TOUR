import Button from "./Button";

export default function Footer() {
  return (
    <footer className="footer mt-20 sm:mt-40 md:mt-60 py-8 sm:py-12 md:py-20 px-4 sm:px-8 md:px-15 rounded-[40px_40px_0_0] sm:rounded-[60px_60px_0_0] md:rounded-[80px_80px_0_0] text-gray-950 shadow-xl shadow-cyan-100/50">
      <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-12 md:gap-16">
        <div className="w-full lg:w-auto">
          <h2 className="font-semibold text-xl sm:text-2xl">About me</h2>
          <hr className="w-15 mb-4" />
          <p className="w-full sm:w-100 text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit optio
            quisquam velit ex cum. Totam minus iure animi itaque repellendus
            corrupti, aliquam sed odio nostrum, dolores eius vel esse nihil.
          </p>
        </div>
        <ul className="w-full lg:w-auto">
          <h2 className="font-semibold text-xl sm:text-2xl">Follow me</h2>
          <hr className="w-15 mb-4" />
          <li className="flex gap-4 py-1">
            <svg
              className="icon icon-whatsapp"
              role="img"
              aria-label="WhatsApp"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg">
              <title>WhatsApp</title>
              <path
                d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .05 5.32.05 12c0 2.12.55 4.18 1.6 5.98L0 24l6.3-1.66A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.19-3.48-8.52zM12 21.6c-1.6 0-3.16-.43-4.53-1.25l-.32-.19-3.74.99.93-3.65-.21-.37A9.6 9.6 0 0 1 2.4 12c0-5.31 4.29-9.6 9.6-9.6S21.6 6.69 21.6 12 17.31 21.6 12 21.6z"
                fill="currentColor"
              />
              <path
                d="M17.1 14.2c-.3-.15-1.7-.84-1.95-.94-.25-.1-.43-.15-.62.15-.18.3-.7.94-.86 1.13-.16.18-.32.2-.6.07-.28-.13-1.2-.44-2.29-1.45-.85-.76-1.43-1.69-1.6-1.97-.16-.28-.02-.43.12-.58.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.06-.14-.62-1.5-.85-2.06-.22-.54-.44-.46-.6-.47l-.51-.01c-.17 0-.44.06-.67.28-.23.22-.88.86-.88 2.08 0 1.22.9 2.4 1.03 2.58.13.18 1.78 2.85 4.32 3.88 2.54 1.03 2.54.69 3 1.14.46.46 1.2 1.02 1.37 1.18.18.16.3.23.44.14.14-.10 1.7-.78 1.95-1.44.24-.67.24-1.24.17-1.36-.07-.12-.25-.18-.55-.33z"
                fill="currentColor"
              />
            </svg>{" "}
            <a href="#" className="text-sm sm:text-base">
              WhatsApp
            </a>
          </li>
          <li className="flex gap-4 py-1">
            <svg
              className="icon icon-facebook"
              role="img"
              aria-label="Facebook"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg">
              <title>Facebook</title>
              <path
                d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.29 10.44 22v-6.96H8.07V12.1h2.37V9.85c0-2.34 1.4-3.63 3.54-3.63 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 3.01h-2.18V22C18.34 21.29 22 17.09 22 12.07z"
                fill="currentColor"
              />
            </svg>{" "}
            <a href="#" className="text-sm sm:text-base">
              Facebook
            </a>
          </li>
          <li className="flex gap-4 py-1">
            <svg
              className="icon icon-linkedin"
              role="img"
              aria-label="LinkedIn"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg">
              <title>LinkedIn</title>
              <path
                d="M20.45 20.45h-3.55v-5.4c0-1.29 0-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.5H8.98V9h3.4v1.57h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v6.33zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM6.87 20.45H3.8V9H6.87v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
                fill="currentColor"
              />
            </svg>{" "}
            <a href="#" className="text-sm sm:text-base">
              LinkedIn
            </a>
          </li>
          <li className="flex gap-4 py-1">
            <svg
              className="icon icon-email"
              role="img"
              aria-label="Email"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg">
              <title>Email</title>
              <path
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
                fill="currentColor"
              />
            </svg>{" "}
            <a href="#" className="text-sm sm:text-base">
              Email
            </a>
          </li>
        </ul>
        <div className="flex flex-col justify-between w-full lg:w-[35%]">
          <h2 className="font-semibold text-xl sm:text-2xl">Subscribe</h2>
          <hr className="w-15 mb-4" />
          <input
            className="border-gray-800 border-1 p-2 outline-none rounded-[7px] mb-4 text-sm sm:text-base"
            type="text"
            placeholder="Enter your email..."
          />
          <Button
            type="glass"
            size="lg"
            className="block uppercase cursor-pointer text-white text-lg sm:text-xl font-semibold tracking-wider bg-white/20 backdrop-blur-sm py-2 rounded-md hover:bg-lime-700 hover:translate-y-1 transition-all duration-300">
            Subscribe now
          </Button>
        </div>
      </div>
    </footer>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* About Section */}
      <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          About Us
        </h1>
        <p className="mt-4 text-gray-700 text-lg text-center">
          Welcome to <strong>SI - NEWS</strong>, your trusted source for the
          latest news and updates. Our mission is to deliver high-quality,
          organized, and relevant news to our readers.
        </p>
        <p className="mt-4 text-gray-700 text-lg text-center">
          We cover a variety of events happening in **Siriraj**. We work hard to
          provide an accurate system and timely information.
        </p>
        <p className="mt-4 text-gray-700 text-lg text-center">
          พวกเราตั้งใจจะสร้างระบบประชาสัมพันธ์ข่าวใหม่ให้กับทุกคน
          ใช้เป็นระบบติดตามข่าวสารได้ง่ายขึ้น
        </p>
      </section>

      {/* Developer Profiles Section */}
      <section className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          👨‍💻 Meet Our Developers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* Developer 1 - Khemjirath Hengswat */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold">
              Khemjirath Hengswat (Jeffrey)
            </h3>
            <p className="text-gray-600">6501070 • SI 133</p>
            <div className="flex justify-center gap-3 mt-3">
              <a
                href="https://www.facebook.com/khemjirath.hengswat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://www.instagram.com/jeffrey__kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://line.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111774.png"
                  alt="Line ID"
                  className="w-6 h-6"
                />
              </a>
              <a href="mailto:khemjirath.hen@student.mahidol.edu">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                  alt="Email"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          {/* Developer 2 - Sompakorn (Bom) */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold">Sompakorn (Bom)</h3>
            <p className="text-gray-600">6501034 • SI 133</p>
            <div className="flex justify-center gap-3 mt-3">
              <a
                href="https://instagram.com/___bom.s"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a href="mailto:sompakorn.lap@student.mahidol.edu">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                  alt="Email"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      </>
  );
}

export default AboutPage;

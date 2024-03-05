import React from "react";

function Footer() {
  return (
    <div className=" text-white py-5">
      <div className="container mx-auto px-4 divide-y divide-white">
        <div className="grid grid-cols-3 text-center md:text-lg items-center py-4">
          <a href="https://www.linkedin.com/in/emanuele-macchiarulo-web-dev/">LinkedIn</a>
          <a href="https://github.com/Em404">GitHub</a>
          <a href="mailto:emanuele.macchiarulo.1998@gmail.com">Email</a>
        </div>
        <div className="text-center py-5">
          2024 | Copyright ©{" "}
          <a href="https://www.linkedin.com/in/emanuele-macchiarulo-web-dev/" className="italic">
            Emanuele Macchiarulo
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

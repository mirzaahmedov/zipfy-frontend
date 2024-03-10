function Footer() {
  return (
    <div className="px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="font-brand bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent text-5xl">
        Zipfy
      </h1>
      <p className="text-gray-700 text-center">
        Developed by{" "}
        <a
          href="https://mirzaahmedov.uz"
          className="text-primary hover:underline"
        >
          mirzaahmedov
        </a>{" "}
        &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;

const Newsletter = () => {
  return (
    <section className="py-6 bg-base-100 mt-12">
      <div className="container mx-auto flex flex-col justify-evenly p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row border border-yellow-700 rounded-xl">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-3xl font-bold leading-none">
            Stay Informed with Our Newsletter!
          </h1>
          <p className="">
            <span className="font-bold text-lg">
              {" "}
              Subscribe to our newsletter and never miss out on:
            </span>
            <ul className=" list-disc list-inside mt-3">
              <li>Exclusive deals and special offers</li>
              <li>The latest news and updates from our hotels</li>
              <li>The latest news and updates from our hotels</li>
            </ul>
          </p>
        </div>
        <div className="border-r-2 border-yellow-600"></div>
        <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="example@email.com"
              className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
            />
            <button
              type="button"
              className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-violet-600 dark:text-gray-50"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

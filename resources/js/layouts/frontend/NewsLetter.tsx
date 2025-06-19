import bg from "@/assets/banner/newsletter.jpg";

function NewsLetter() {
    return (
        <div className="my-20">
            <div className="container">
                <div className="flex flex-col lg:flex-row justify-between items-center  bg-no-repeat bg-cover bg-center rounded-xl py-10 lg:py-28 px-10 lg:px-16 gap-8" style={{ backgroundImage: `url("${bg}")` }} >
                    <div>
                        <h2 className="title-lg text-light w-full md:w-80">
                            Subscribe to our Newsletter
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            className="rounded-xl px-5 h-14 sm:h-auto"
                            type="text"
                            placeholder="Your Email Address"
                        />
                        <button className="text-light font-bold bg-main px-10 py-5 rounded-xl">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsLetter;

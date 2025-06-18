import bannerImg from '@/assets/banner/hero.png';
{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */}

export default function Hero() {
    return (
        <section
            className="pt-28 pb-32 xl:pt-60 xl:pb-72 xl:pt-80 xl:pb-96 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bannerImg})` }}
        >
            <div className="container">
                <h4 className="secondary-title pb-10">100% Natural Food</h4>
                <button className="yellow-btn flex items-center gap-2">
                    Explore Now
                    <span className="text-light bg-main w-7 h-7 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-arrow-right"></i>
                    </span>
                </button>
            </div>
        </section>
    );
}

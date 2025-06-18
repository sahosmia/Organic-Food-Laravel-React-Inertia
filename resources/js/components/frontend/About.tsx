import MainBtn from '@/components/frontend/tools/btn/MainBtn'
import aboutBg from '@/assets/about/about-one.png'
function About() {
    return (

        <div className='bg-whitetwo py-20'>
            <div className="container flex gap-5 flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                    <img src={aboutBg} alt="" />
                </div>
                <div className="w-full lg:w-1/2">
                    <h4 className="secondary-title pb-2">About Us</h4>
                    <h2 className="title-lg pb-8">
                        We Believe in Working Accredited Farmers
                    </h2>
                    <p className="pb-10">
                        Simply dummy text of the printing and typesetting industry. Lorem
                        had ceased to been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley.
                    </p>
                    <ul className="pb-10 sm:w-4/5">
                        <li className="flex gap-5 flex-col sm:flex-row pb-8">
                            <div className="bg-light rounded p-5 w-24 relative after:absolute after:w-5 after:h-5 after:bg-yellowca after:bg-opacity-50 after:rounded-full after:top-5 after:left-5">
                                <img
                                    src="https://img.icons8.com/ios/7EB693/vegan-food.png"
                                    alt="vegan-food"
                                    className="w-14"
                                />
                            </div>
                            <div>
                                <h4 className="title-sm pb-2">Organic Foods Only</h4>
                                <p>
                                    Simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum
                                </p>
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row gap-5 sm:items-center">
                            <div className="bg-light rounded p-5 w-24 relative after:absolute after:w-5 after:h-5 after:bg-yellowca after:bg-opacity-50 after:rounded-full after:top-5 after:left-5">
                                <img
                                    src="https://img.icons8.com/ios/7EB693/mailbox-plane.png"
                                    alt="mailbox-plane"
                                    className="w-14 inline-block"
                                />
                            </div>
                            <div className="">
                                <h4 className="title-sm pb-2">Quality Standards</h4>
                                <p>
                                    Simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum
                                </p>
                            </div>
                        </li>
                    </ul>
                    <MainBtn />
                </div>
            </div>
        </div>
    );
}

export default About

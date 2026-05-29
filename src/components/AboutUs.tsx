const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-16 border-primary/20 border-2 rounded-lg bg-transparent backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center">About Us</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
                At Meta Monk Visuals, we are a passionate team of visual storytellers dedicated to transforming ideas into captivating cinematic experiences. With expertise in VFX, CGI, motion graphics, and 3D animation, we craft visually stunning content that resonates with audiences and elevates brands. Our mission is to push the boundaries of creativity and technology, delivering innovative solutions that bring your vision to life with unparalleled quality and impact.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 ">
                <p className=" text-lg font-semibold mt-4">Founder: Anmol Sharma</p>
                <p className=" text-lg font-semibold mt-4">CEO: Mudit Gupta</p>
                <p className=" text-lg font-semibold mt-4">CTO: Sagar Tamrakar</p>
                <p className=" text-lg font-semibold mt-4">MD: Sachin Sharma</p>
            </div>
        </div>
    );
}
export default AboutUs;
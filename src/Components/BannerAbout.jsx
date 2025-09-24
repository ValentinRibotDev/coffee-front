export function BannerAbout () {
    return (
        <>
            <img 
                src="/Banner/bannerAbout_sm.png" 
                alt="banner" 
                className="h-[100px] min-w-[768px] md:hidden"
                draggable="false"
            />

            <img 
                src="/Banner/bannerAbout_md.png" 
                alt="banner" 
                className="hidden md:block h-[120px] min-w-[1024px] lg:hidden"
                draggable="false"
            />

            <img 
                src="/Banner/bannerAbout_xl.png" 
                alt="banner" 
                className="hidden lg:block h-[200px] min-w-[1920px]"
                draggable="false"
            />
        </>
    )
}
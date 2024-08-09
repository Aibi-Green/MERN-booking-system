import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react"
import { Separator } from "./ui/separator"
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"

const Footer = () => {
    return (<>
        <footer className="bg-primary text-secondary p-20 pb-10 flex flex-col 
        md:flex-row gap-5 text-center md:pb-20">
            <div className="contacts-section md:flex-1">
                <h1 className="text-2xl font-semibold mb-10">Contact Us</h1>

                <div className="flex flex-col gap-5">
                    <div className="flex gap-2 justify-center">
                        <Phone /><span>0956 123 2389</span>
                    </div>
                    <div className="flex gap-2 justify-center cursor-pointer">
                        <Mail /><span>harmony.heights@gmail.com</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <MapPin /><span>Harmony Heights, Foreign Hills, Country</span>
                    </div>
                </div>
            </div>
            <Separator className="my-8 opacity-20 md:hidden" />
            <div className="social-media md:flex-1">
                <h1 className="text-2xl font-semibold mb-10">Keep In Touch</h1>
                <div className="flex gap-5 justify-center">
                    <div className="rounded-full border-2 p-3 max-w-fit hover:bg-white/20 cursor-pointer">
                        <Facebook className="size-8" />
                    </div>
                    <div className="rounded-full border-2 p-3 max-w-fit hover:bg-white/20 cursor-pointer">
                        <InstagramLogoIcon className="size-8" />
                    </div>
                    <div className="rounded-full border-2 p-3 max-w-fit hover:bg-white/20 cursor-pointer">
                        <TwitterLogoIcon className="size-8" />
                    </div>
                    <div className="rounded-full border-2 p-3 max-w-fit hover:bg-white/20 cursor-pointer">
                        <Youtube className="size-8" />
                    </div>
                </div>
                <div className="flex justify-center space-x-5 text-sm mt-20 md:mt-10">
                    <div className="cursor-pointer">Terms of Use</div>
                    <Separator orientation="vertical" className="h-5 opacity-20" />
                    <div className="cursor-pointer">Privacy Statement</div>
                    <Separator orientation="vertical" className="h-5 opacity-20" />
                    <div className="cursor-pointer">About Us</div>
                    <Separator orientation="vertical" className="h-5 opacity-20" />
                </div>
            </div>
        </footer>
    </>)
}

export default Footer
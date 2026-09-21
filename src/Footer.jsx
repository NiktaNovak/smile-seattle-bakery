import './Footer.css';
function Footer(){
    return(
        <footer>
            <h2>Smile Seattle Bakery</h2>
            <p className="tagline">
                Homemade cakes baked with love for every special occasion.
            </p>
            <div className="footer-content">
                <div>
                    <h3>Contact</h3>
                    <p>📍 Las Vegas, NV</p>
                    <p>📞 (702) 419-5659</p>
                    <p>✉️ kdbrown8856@gmail.com</p>
                </div>
            </div>
            <hr></hr>
            <p className="copyright">
                © 2026 Smile Seattle Bakery • Made with ❤️ Fresh Every Day
            </p>

        </footer>
    );
}
export default Footer;
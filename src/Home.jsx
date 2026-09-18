import { Link } from "react-router-dom";
import Cakes from "./Cakes";
import "./Home.css";

function Home() {

    return (
        <main className="home-container">

            {/* ==============================
                HERO
            ============================== */}

            <section className="hero">

                <div className="hero-decoration hero-decoration-one">
                    ✦
                </div>

                <div className="hero-decoration hero-decoration-two">
                    ✧
                </div>

                <div className="hero-decoration hero-decoration-three">
                    ♡
                </div>

                <div className="hero-content">

                    <div className="hero-text">

                        <p className="hero-eyebrow">
                            WELCOME TO SMILE SEATTLE BAKERY
                        </p>

                        <h1>
                            Sweet Moments,
                            <span> Made With Love.</span>
                        </h1>

                        <p className="hero-description">
                            Handmade cakes created for birthdays,
                            celebrations, special moments, and
                            everything worth smiling about.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/Order"
                                className="hero-primary-btn"
                            >
                                Order a Cake
                            </Link>

                            <Link
                                to="/About"
                                className="hero-secondary-btn"
                            >
                                Our Story
                            </Link>

                        </div>

                    </div>


                    <div className="hero-cake">

                        <div className="cake-glow"></div>

                        <div className="cake-circle">

                            <div className="cake-emoji">
                                🎂
                            </div>

                            <div className="cake-sparkle sparkle-one">
                                ✦
                            </div>

                            <div className="cake-sparkle sparkle-two">
                                ✧
                            </div>

                            <div className="cake-sparkle sparkle-three">
                                ♡
                            </div>

                        </div>

                        <div className="hero-badge">
                            <strong>Made Fresh</strong>
                            <span>with love ♡</span>
                        </div>

                    </div>

                </div>

            </section>


            {/* ==============================
                WHY CHOOSE US
            ============================== */}

            <section className="why-section">

                <div className="section-heading">

                    <p className="section-eyebrow">
                        WHY SMILE SEATTLE?
                    </p>

                    <h2>
                        A Little More Than Just Cake
                    </h2>

                    <p>
                        Every cake is made with care, attention to
                        detail, and a whole lot of love.
                    </p>

                </div>


                <div className="why-cards">

                    <article className="why-card">

                        <div className="why-icon">
                            🍰
                        </div>

                        <h3>
                            Handmade
                        </h3>

                        <p>
                            Every cake is carefully prepared by hand
                            with attention to every delicious detail.
                        </p>

                    </article>


                    <article className="why-card">

                        <div className="why-icon">
                            ❤️
                        </div>

                        <h3>
                            Made With Love
                        </h3>

                        <p>
                            We believe the best desserts are made
                            with patience, care, and a little extra love.
                        </p>

                    </article>


                    <article className="why-card">

                        <div className="why-icon">
                            ✨
                        </div>

                        <h3>
                            Made for Moments
                        </h3>

                        <p>
                            From birthdays to everyday celebrations,
                            we're here to make your moments sweeter.
                        </p>

                    </article>

                </div>

            </section>


            {/* ==============================
                CAKES
            ============================== */}

            <section className="home-cakes">

                <div className="section-heading cakes-heading">

                    <p className="section-eyebrow">
                        SOMETHING SWEET
                    </p>

                    <h2>
                        Our Favorite Cakes
                    </h2>

                    <p>
                        Find something delicious for your next
                        celebration.
                    </p>

                </div>

                <Cakes />

                <div className="cakes-cta">

                    <Link
                        to="/Order"
                        className="section-button"
                    >
                        View All Cakes →
                    </Link>

                </div>

            </section>


            {/* ==============================
                NANA / STORY
            ============================== */}

            <section className="story-section">

                <div className="story-decoration">
                    ♡
                </div>

                <div className="story-content">

                    <div className="story-art">

                        <div className="story-circle">

                            <div className="story-icon">
                                👩‍🍳
                            </div>

                        </div>

                        <div className="story-small-card">
                            <span>Est.</span>
                            <strong>With Love</strong>
                        </div>

                    </div>


                    <div className="story-text">

                        <p className="section-eyebrow">
                            THE STORY BEHIND THE BAKERY
                        </p>

                        <h2>
                            Meet Nana
                        </h2>

                        <p>
                            Behind every sweet creation is a love
                            for baking and bringing people together.
                        </p>

                        <p>
                            Smile Seattle Bakery was inspired by the
                            warmth of homemade desserts and the special
                            feeling that comes from sharing something
                            delicious with the people you love.
                        </p>

                        <Link
                            to="/About"
                            className="story-button"
                        >
                            Meet Nana →
                        </Link>

                    </div>

                </div>

            </section>


            {/* ==============================
                FINAL CTA
            ============================== */}

            <section className="final-cta">

                <div className="final-cta-decoration">
                    ✦
                </div>

                <p className="section-eyebrow">
                    LIFE IS BETTER WITH CAKE
                </p>

                <h2>
                    Ready for Something Sweet?
                </h2>

                <p>
                    Choose your favorite cake and make your
                    next moment a little more special.
                </p>

                <Link
                    to="/Order"
                    className="final-cta-button"
                >
                    Start Your Order 🍰
                </Link>

            </section>

        </main>
    );
}

export default Home;
import { Link } from "react-router-dom";
import "./About.css";

function About() {
    return (
        <main className="about-page">
            <section className="about-hero">
                <div className="about-hero-text">
                    <p className="about-eyebrow">
                        THE STORY BEHIND THE BAKERY
                    </p>
                    <h1>Meet Nana</h1>
                    <p className="hero-subtitle">
                        Making Smiles in Seattle, one sweet treat at a time.
                    </p>
                </div>
            </section>

            <section className="about-story">
                <div className="story-image">
                    <div className="photo-placeholder">
                        Nana's Photo
                    </div>
                </div>

                <div className="about-story-content">
                    <p className="about-eyebrow">
                        A LITTLE ABOUT NANA
                    </p>
                    <h2>
                        A Baker, a Caregiver, and a Whole Lot of Heart
                    </h2>
                    <p>
                        Hi, I'm Karen!
                    </p>
                    <p>
                        I'm a retired radiologic technologist and
                        pastry chef who has always loved putting
                        smiles on people's faces.
                    </p>
                    <p>
                        After years of caring for others, I've found
                        another way to bring a little happiness into
                        people's lives through baking.
                    </p>
                    <p>
                        From beautiful cakes to sweet treats made
                        for special celebrations, I love creating
                        something that makes people smile, one
                        dessert at a time.
                    </p>
                    <p>
                        Now, I'm making Smiles in Seattle.
                    </p>
                </div>
            </section>

            <section className="smiles-section">
                <div className="smiles-content">
                    <span className="quote-mark">
                        “
                    </span>
                    <p className="smiles-quote">
                        I've always loved putting smiles on the
                        faces of others, so now I make Smiles
                        in Seattle.
                    </p>
                    <span className="quote-mark closing">
                        ”
                    </span>
                    <p className="quote-name">
                        — Nana
                    </p>
                </div>
            </section>

            <section className="special-section">
                <div className="section-heading">
                    <p className="about-eyebrow">
                        THE NANA DIFFERENCE
                    </p>
                    <h2>
                        What Makes a Celebration Special
                    </h2>
                    <p>
                        It's the little details, the people we share
                        them with, and the memories we make along the way.
                    </p>
                </div>

                <div className="special-cards">
                    <article className="special-card">
                        <div className="special-icon">
                            🎀
                        </div>
                        <h3>
                            A Personal Touch
                        </h3>
                        <p>
                            Every order gets individual attention
                            because the little details make a big difference.
                        </p>
                    </article>

                    <article className="special-card">
                        <div className="special-icon">
                            🎉
                        </div>
                        <h3>
                            For Every Occasion
                        </h3>
                        <p>
                            Whether it's a birthday, milestone,
                            gathering, or simply a reason to celebrate.
                        </p>
                    </article>

                    <article className="special-card">
                        <div className="special-icon">
                            💭
                        </div>
                        <h3>
                            Sweet Memories
                        </h3>
                        <p>
                            The best desserts become part of the
                            moments and memories we carry with us.
                        </p>
                    </article>
                </div>
            </section>

            <section className="about-cta">
                <p className="about-eyebrow">
                    LET'S CELEBRATE TOGETHER
                </p>
                <h2>
                    Let's Make Something Sweet
                </h2>
                <p>
                    Have a special celebration coming up?
                    Let Nana create something delicious for you.
                </p>
                <div className="about-buttons">
                    <Link to="/Order" className="about-button">
                        Browse Our Cakes
                    </Link>
                    <Link to="/Contact" className="about-button">
                        Request a Custom Order
                    </Link>
                </div>
            </section>
        </main>
    );
}
export default About;
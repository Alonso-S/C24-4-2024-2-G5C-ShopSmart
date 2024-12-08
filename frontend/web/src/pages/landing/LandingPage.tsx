import Features from "../../components/features/Features";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import HowItWorks from "../../components/how-it-works/HowItWorks";
import styles from "./landing-page.module.css";
export const LandingPage = () => {
    return (
        <>
            <main className={styles.container}>
                <Hero />
                <Features />
                <HowItWorks />
            </main>
            <Footer />
        </>
    );
};

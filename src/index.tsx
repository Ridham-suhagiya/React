import React from "./react";
import earth from "./images/earth.png";
import redStar from "./images/red-star.png";
import blueStar from "./images/blue-star.png";
import Helmet from "./images/helmet.png";
import lemon from "./images/lemon.png";
import Building from "./images/building.png";
import Mick from "./images/mick.png"

export const PortfolioApp = () => {
    const { createElement, useState, useEffect, mount } = React();

    function getCurrentScreenDimensions(): any {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    //constants
    const sections = ["About", "Experience", "Projects", "Skills", "Contact"];
    const imageArr = [earth, Building, lemon, Mick, earth, earth];

    // components 

    const RedBlueStars = ({ numberOfStars, starImage }: any) =>
        createElement("img", { style: { position: "absolute", left: `${100 * Math.random()}%`, top: `${100 * Math.random()}%`, width: "74px" }, src: starImage });


    const SectionWithImage = ({ sectionComponent, imageSrc, index, imageStyles, addRandomStars, addImage, isMobileView }: any) => {

        const isEven = index % 2 === 0;

        const numberOfStars = 5 * Math.random()

        return createElement("div", {
            style: {
                display: "flex",
                flexDirection: isMobileView ? "column" : isEven ? "row" : "row-reverse", // Alternate sides
                alignItems: "center",
                gap: "40px", // Space between content and image
                marginBottom: "60px", // Increased margin between sections
                position: "relative",
                width: "100%"
            }
        },
            sectionComponent(),
            addImage && createElement("img", {
                src: imageSrc,
                style: imageStyles
            }),
            ...(addRandomStars ? Array.from({ length: numberOfStars }).map((_, i: number) => {
                const star = i % 2 === 0 ? redStar : blueStar;
                return { componentFunc: RedBlueStars, props: { key: i, numberOfStars: 1, starImage: star }, componentId: "red-blue-stars" }
            }
            ) : [])
        );
    };
    const Header = () => createElement("header", { id: "header", className: "header slider-item" },
        createElement("div", { className: "header-content" },
            createElement("h1", null, "Ridham Suhagiya"),
            createElement("p", null, "Software Development Engineer | Full-Stack Developer")
        )
    )

    const Underline = ({ text }: any) => {
        return createElement("span", {
            style: {
                position: "relative",
                display: "inline-block",
            }
        },
            text,
            createElement("span", {
                className: "underline-wave",
                style: {
                    position: "absolute",
                    left: 0,
                    bottom: "-5px", // Adjust this value to control the distance of the line from the text
                    width: "100%",
                    height: "10px", // Height of the wavy line
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDIiIHdpZHRoPSI4IiBoZWlnaHQ9IjIiPjxwYXRoIGQ9Ik0wIDBoOHYySDB6IiBmaWxsPSJvcmFuZ2UiIC8+PHBhdGggZD0iTTAgMWg4djFIMHoiIGZpbGw9Im9yYW5nZSIgLz48L3N2Zz4=')", // Wavy SVG pattern
                    backgroundRepeat: "repeat-x", // Repeat the wave pattern horizontally
                    backgroundSize: "8px 10px", // Size of the wave pattern
                }
            })
        );
    };
    const components: any = {
        About: () => createElement("section", { id: "about", className: "about slider-item" },
            createElement("div", { className: "content" },
                createElement("h2", null, "About Me"),
                createElement("p", null, "Experienced software engineer skilled in Python, JavaScript, and modern web technologies.")
            )
        ),
        Experience: () => createElement("section", { id: "experience", className: "experience slider-item" },
            createElement("div", { className: "content" },
                createElement("h2", null, "Experience"),
                createElement("ul", null,
                    createElement("li", null, "Software Development Engineer at IDfy Identity Verification (June 2023 - Present)"),
                    createElement("li", null, "Software Development Engineer Intern at IDfy Identity Verification (Nov 2022 - Apr 2023)"),
                    createElement("li", null, "Backend Developer Intern at Anand Rathi Wealth Ltd (July 2022 - Oct 2022)")
                )
            )
        ),
        Projects: () => createElement("section", { id: "projects", className: "projects slider-item" },
            createElement("div", { className: "content" },
                createElement("h2", null, "Projects"),
                createElement("ul", null,
                    createElement("li", null, "Online Examination Monitoring - Python, FastAPI, ReactJS, Docker, PostgreSQL"),
                    createElement("li", null, "Online PDF-Maker -", { componentFunc: Underline, componentId: "underline", props: { text: "Python, HTML, CSS, Flask" } })
                )
            )
        ),
        Skills: () => createElement("section", { id: "skills", className: "skills slider-item" },
            createElement("div", { className: "content" },
                createElement("h2", null, "Skills"),
                createElement("ul", null,
                    createElement("li", null, "Programming Languages: Python, JavaScript, Java"),
                    createElement("li", null, "Web Technologies: ReactJS, FastAPI, Flask"),
                    createElement("li", null, "Database Management: PostgreSQL, MySQL"),
                    createElement("li", null, "Tools: Docker, AWS, Git"),
                    createElement("li", null, "Soft Skills: Team Collaboration, Problem Solving, Communication")
                )
            )
        ),
        Contact: () => createElement("section", { id: "contact", className: "contact slider-item" },
            createElement("div", { className: "content" },
                createElement("h2", null, "Contact"),
                createElement("p", null, "Email: ridhamsuhagiya@gmail.com"),
                createElement("p", null, "GitHub: github.com/Ridham-suhagiya"),
                createElement("p", null, "LinkedIn: linkedin.com/in/ridham-suhagiya"),
                createElement("p", null, "HackerRank: hackerrank.com/Ridhamsuhagiya"),
                createElement("p", null, "LeetCode: leetcode.com/Ridham_20"),
                createElement("p", null, "YouTube: youtube.com/channel/UCtBifHWSUEomf4-FHIBDA1A")
            )
        )
    };


    const Slider = () => {
        const [screenSize, setScreenSize] = useState<any>(getCurrentScreenDimensions());
        const [currentIndex, setCurrentIndex] = useState(0);
        const checkIfMobile = () => {
            if (screenSize.width <= 800) {
                // setIsMobileView(true);
                return true;
            } else {
                // setIsMobileView(false);
                return false
            }
        }
        const [isMobileView, setIsMobileView] = useState<boolean>(checkIfMobile());
        useEffect(() => {
            const updateDimension = (): any => {
                setScreenSize(getCurrentScreenDimensions());
            };

            window.addEventListener("resize", updateDimension);

            return () => {
                window.removeEventListener("resize", updateDimension);
            };
        }, []);
        
        useEffect(() => {
            console.log(screenSize.width);
            if (screenSize.width <= 800) {
                setIsMobileView(true);
            } else {
                setIsMobileView(false);
            }
        }, [screenSize, isMobileView]);
        console.log(isMobileView)


        const scrollToSection = (id: string) => {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        };

        return createElement("div", { className: "slider-container" },
            createElement("div", { className: "slider-chips", style: { display: "flex", flexDirection: isMobileView ? "column" : "row", justifyContent: "center", gap: isMobileView ? "10px" : "20px", marginBottom: "20px" } },
                ...sections.map((section, index) =>
                    createElement("div", {
                        className: `slider-chip ${index === currentIndex ? "active" : ""}`,
                        style: {
                            padding: "10px 20px",
                            background: index === currentIndex ? "#9b5de5" : "rgba(255, 255, 255, 0.1)",
                            borderRadius: "20px",
                            cursor: "pointer",
                            transition: "background 0.3s ease, transform 0.3s ease",
                            color: index === currentIndex ? "#fff" : "#e0d7ff",
                            fontSize: isMobileView ? "1rem" : "1.2rem",
                            textAlign: "center",
                            width: isMobileView ? "100%" : "auto",
                        },
                        onClick: () => {
                            setCurrentIndex(index);
                            scrollToSection(section.toLowerCase());
                        }
                    }, section)
                ),
            ),
            createElement("div", { className: "portfolio" },
                createElement("div", { style: { display: "flex", alignItems: "center", gap: "100px", flexDirection: isMobileView ? "column" : "row" } }, { componentFunc: Header, componentId: "header-component" }, createElement("img", { src: Helmet, height: "300rem" })),
                ...sections.map((section, index: number) =>
                    createElement("div", null, {
                        componentFunc: SectionWithImage, props: {
                            sectionComponent: components[section],
                            imageSrc: imageArr[index],
                            index: index,
                            key: section, // Ensure each section has a unique key
                            imageStyles: {
                                width: "300px", // Adjust image size
                                height: "auto",
                                borderRadius: "10px", // Rounded corners
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" // Subtle shadow
                            },
                            isMobileView: isMobileView,
                            addImage: sections[index] !== "Contact",
                            addRandomStars: true
                        }, componentId: "section-with-image"
                    })
                )
            )
        );
    };

    const APP = () => {
        return createElement("div", null, { componentFunc: Slider, componentId: "slider-component" });
    };

    mount({ componentFunc: APP, componentId: "main-app-component" });
};

PortfolioApp();
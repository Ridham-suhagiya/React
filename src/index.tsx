import React from "./react";
import earth from "./images/earth.png";
import redStar from "./images/red-star.png";
import blueStar from "./images/blue-star.png";
import Helmet from "./images/helmet.png";

export const PortfolioApp = () => {
    const { createElement, useState, useEffect, mount } = React();
    //constants
    const sections = ["About", "Experience", "Projects", "Skills", "Contact"];
    const imageArr = [earth, earth, earth, earth, earth, earth];


    // components 

    const RedBlueStars = ({ numberOfStars, starImage }: any) =>
        createElement("img", { style: { position: "absolute", left: `${100 * Math.random()}%`, top: `${100 * Math.random()}%`, height: "34px" }, src: starImage });


    const SectionWithImage = ({ sectionComponent, imageSrc, index, imageStyles, addRandomStars }: any) => {

        const isEven = index % 2 === 0;

        const numberOfStars = 10 * Math.random()

        return createElement("div", {
            style: {
                display: "flex",
                flexDirection: isEven ? "row" : "row-reverse", // Alternate sides
                alignItems: "center",
                gap: "40px", // Space between content and image
                marginBottom: "60px", // Increased margin between sections
                position: "relative"
            }
        },
            sectionComponent(),
            createElement("img", {
                src: imageSrc,
                style: imageStyles
            }),
            ...(addRandomStars ? Array.from({ length: numberOfStars }).map((_, i: number) => {
                const star = i % 2 === 0 ? redStar : blueStar;
                console.log(isEven, star)
                return { componentFunc: RedBlueStars, props: { key: i, numberOfStars: 1, starImage: star }, componentId: "red-blue-stars" }
            }
            ): [])
        );
    };
    const Header = () => createElement("header", { id: "header", className: "header slider-item" },
        createElement("div", { className: "header-content" },
            createElement("h1", null, "Ridham Suhagiya"),
            createElement("p", null, "Software Development Engineer | Full-Stack Developer")
        )
    )
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
                    createElement("li", null, "Online PDF-Maker - Python, HTML, CSS, Flask")
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
        const [currentIndex, setCurrentIndex] = useState(0);

        const scrollToSection = (id: string) => {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        };

        return createElement("div", { className: "slider-container" },
            createElement("div", { className: "slider-chips" },
                ...sections.map((section, index) =>
                    createElement("div", {
                        className: `slider-chip ${index === currentIndex ? "active" : ""}`,
                        onClick: () => {
                            setCurrentIndex(index);
                            scrollToSection(section.toLowerCase());
                        }
                    }, section)
                ),
            ),
            createElement("div", { className: "portfolio" },
                createElement("div", { style: { display: "flex", alignItems: "center" } }, { componentFunc: Header, componentId: "header-component" }, createElement("img", { src: Helmet, height: "300rem" })),
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
                            addRandomStars: false
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
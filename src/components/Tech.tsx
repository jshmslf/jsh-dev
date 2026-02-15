// import { HiChevronRight } from "react-icons/hi"
import '../styles/Tech.scss';
import { portfolioService } from "../services/portfolio.service";

function Tech() {
    const { tech } = portfolioService.home();

    return (
        <div className="card tech">
            <div className="card-header">
                <h2 className="card-title">Tech Stack</h2>
                {/* <a href="/tech-stack" className="view-all">
                    View all <HiChevronRight />
                </a> */}
            </div>

            <div className="card-content">
                {tech.map((section) => (
                    <div key={section.title} className="tech-group">
                        <h3 className="tech-title">{section.title}</h3>
                        <div className="badge-row">
                            {section.items.map((item) => (
                                <span
                                    key={item.label}
                                    className="badge"
                                >
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tech

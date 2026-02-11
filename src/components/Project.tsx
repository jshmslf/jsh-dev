// import { HiChevronRight } from "react-icons/hi"
import { portfolioService } from "../services/portfolio.service"
import '../styles/Project.scss';

function Project() {
    const { project } = portfolioService.home();

    return (
        <div className="card proj">
            <div className="card-header">
                <h2 className="card-title">Recent Project</h2>
                {/* <a href="/projects" className="view-all">
                    View all <HiChevronRight />
                </a> */}
            </div>

            <div className="card-content">
                {project.map((section) => (
                    <div key={section.project_title} className="proj-group">
                        <h3 className="proj-title text-lg">{section.project_title}</h3>
                        <span className="text-sm">{section.project_desc}</span>
                        <p className="description text-xs">{section.project_link}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Project
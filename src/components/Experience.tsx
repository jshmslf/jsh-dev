import { portfolioService } from "../services/portfolio.service";
import '../styles/Experience.scss';

function Experience() {
    const { experience } = portfolioService.home();

    const sortedItems = [...experience.items].sort(
        (a, b) => Number(b.starting_year) - Number(a.starting_year)
    );

    return (
        <div className="card experience">
            <h2 className="card-title">{experience.title}</h2>

            <div className="experience-list">
                {sortedItems.map((item, index) => {
                    const isLatest = index === 0;

                    return (
                        <div className="experience-item" key={index}>
                            <div className="timeline">
                                <span className={`box ${isLatest ? "box-latest" : ""}`} />
                                {index !== sortedItems.length - 1 && <span className="line" /> }
                            </div>

                            <div className="content">
                                <div className="header">
                                    <h3 className="job-title">{item.job_title}</h3>
                                    <span className="year">{item.starting_year}</span>
                                </div>
                                <p className="company">{item.company_name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Experience

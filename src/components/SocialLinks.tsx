import { portfolioService } from "../services/portfolio.service";
import '../styles/SocialLinks.scss';

function SocialLinks() {
    const { socials } = portfolioService.home();

    return (
        <div className="card socials">
            <h2 className="card-title">{socials.title}</h2>
            
            <div className="card-content">
                {socials.items.map((section) => (
                    <div key={section.social_title} className="social-info">
                        <a href={section.social_link} target="_blank" className="link hover-translate">
                            <section.icon size={20}/>
                            <span>{section.social_title}</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SocialLinks

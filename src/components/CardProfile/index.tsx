import { Link } from "react-router-dom";
import { DataUser } from "../../data";
import Globe from "../Icons/Globe";
import Email from "../Icons/Email";
import Phone from "../Icons/Phone";
import LocationDot from "../Icons/LocationDot";
import "./CardProfile.css";
import Profile from "../Icons/Profile";

type PropsCardProfile = {
  user: DataUser;
};

export default function CardProfile({ user }: PropsCardProfile) {
  return (
    <div className="cardprofile">
      <div className="cardprofile__profile-img">
        <Profile className="cardprofile__icon-profile" />
      </div>
      <p className="cardprofile__name">{user.name}</p>
      <Link
        to={`/users/${user.id}`}
        target="_self"
        rel="next"
        aria-label={`View user ${user.username}`}
        className="cardprofile__username-link"
      >
        @{user.username}
      </Link>
      <p className="cardprofile__location">
        <LocationDot className="cardprofile__icon-location" />{" "}
        <span className="cardprofile__text-location">{user.address.city}</span>
      </p>
      <div className="cardprofile__contacts">
        <a
          href={user.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`visit website user ${user.username}`}
          className="cardprofile__link cardprofile__link--contact"
        >
          <Globe className="cardprofile__icon-link" />
        </a>
        <a
          href={`mailto:${user.email}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`visit email user ${user.username}`}
          className="cardprofile__link cardprofile__link--email"
        >
          <Email className="cardprofile__icon-link" />
        </a>
        <a
          href={`tel:${user.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`visit phone user ${user.username}`}
          className="cardprofile__link cardprofile__link--phone"
        >
          <Phone className="cardprofile__icon-link" />
        </a>
      </div>
    </div>
  );
}
